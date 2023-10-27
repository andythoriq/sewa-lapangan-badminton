<?php

namespace App\Http\Controllers\Master;

use App\Models\RentalModel;
use App\Traits\SendWA;
use Illuminate\Http\Request;
use App\Models\CustomerModel;
use App\Models\TransactionModel;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingDetailResource;
use App\Http\Resources\HistoryBookingCollection;
use App\Http\Resources\Master\TransactionResource;
use App\Http\Resources\Master\TransactionCollection;

class TransactionController extends Controller
{
    use SendWA;
    public function index()
    {
        $transactions = TransactionModel::select(['id', 'total_price', 'total_hour', 'booking_code'])->get();
        return new TransactionCollection($transactions);
    }

    public function show(TransactionModel $transaction)
    {
        return new TransactionResource($transaction->loadMissing('rentals'));
    }

    public function booking_history(Request $request)
    {
        $keyword = $request->input('keyword');

        $rentals = RentalModel::when($keyword, function ($query) use ($keyword) {
             $query->where(function($q) use($keyword){
                return $q->where('start', 'like', '%' . $keyword . '%')
                    ->orWhere('finish', 'like', '%' . $keyword . '%')
                    ->orWhereHas('customer', function ($customer) use ($keyword) {
                        $customer->where('name', 'like', '%' . $keyword . '%')
                            ->orWhere('phone_number', 'like', '%' . $keyword . '%');
                    })
                    ->orWhereHas('court', function ($court) use ($keyword) {
                        $court->where('label', 'like', '%' . $keyword . '%')
                            ->orWhere('initial_price', 'like', '%' . $keyword . '%');
                    });
                });
            })
            ->select(['id', 'start', 'finish', 'price', 'status', 'transaction_id', 'customer_id', 'court_id'])
            ->whereIn('status', ['F', 'C'])
            ->orWhereHas('transaction', function($trx) {
                $trx->where('isPaid', 'Y')->orWhere('isDebt', 'Y')->orWhere('isDeposit', 'Y');
            })
            ->with([
                'transaction:id,total_price,total_hour,booking_code,customer_paid,customer_debt,customer_deposit',
                'customer:customer_code,name,phone_number',
                'court:id,label,initial_price'
            ]);

        if (auth()->user() === $request->user('customers') || auth()->user() instanceof CustomerModel) {
            $rentals = $rentals->where('customer_id', auth('customers')->id());
        }
        return new HistoryBookingCollection($rentals->paginate(10));
    }

    public function booking_verification(Request $request, string $booking_code = '')
    {
        if (! $request->input('booking_code') && $booking_code) {
            $request->merge(['booking_code' => $booking_code]);
        }

        $data = $request->validate([
            'booking_code' => ['required', 'exists:tb_transaction,booking_code']
        ]);

        $transactions = TransactionModel::with([
            'rentals.customer:customer_code,name,phone_number,deposit',
            'rentals.user:id,name,username',
            'rentals.court:id,label,initial_price',
            'rentals:id,customer_id,court_id,user_id,transaction_id,start,finish,status,price'
        ])
            ->where('booking_code', $data['booking_code'])
            ->firstOrFail();

        return new BookingDetailResource($transactions);
    }

    public function pay(Request $request)
    {
        $data = $request->validate([
            'customer_deposit' => ['nullable', 'numeric', 'max:1000000.00'],
            'input_deposit' => ['nullable', 'numeric', 'max:1000000.00'],
            'customer_paid' => ['required', 'numeric', 'max:1000000.00'],
            'total_price' => ['required', 'numeric', 'max:1000000.00'],
            'phone_number' => ['required', 'exists:tb_customer,phone_number'],
            'booking_code' => ['required', 'exists:tb_transaction,booking_code'],
            'customer_update_deposit' => ['nullable', 'numeric', 'max:1000000.00']
        ]);

        $customer = CustomerModel::where('phone_number', $data['phone_number'])->firstOrFail();
        $transaction = TransactionModel::where('booking_code', $data['booking_code'])->with('rentals.customer')->firstOrFail();

        $total_paid = (float) $data['customer_paid'] + (float) $data['input_deposit'];

        if ($total_paid < (float) $data['total_price']) { // jika bayar kurang dari biaya, dijadikan hutang
            $debt = (float) $data['total_price'] - (float) $total_paid;
            $customer->debt += $debt;
            $transaction->fill([
                'isDebt' => 'Y',
                'customer_debt' => $debt,
            ]);
        }

        if ((float) $data['customer_deposit'] > 0) { // jika bayarnya lebih, dijadikan deposit
            $customer->deposit += (float) $data['customer_deposit'];
        }

        if ((float) $data['customer_update_deposit'] > 0) { // jika ingin menambah deposit
            $customer->deposit += (float) $data['customer_update_deposit'];
        }

        if ((float) $data['input_deposit'] > 0) { // jika depositnya dipakai
            $customer->deposit -= (float) $data['input_deposit'];
            $transaction->fill([
                'isDeposit' => 'Y',
                'customer_deposit' => $data['input_deposit'],
            ]);
        }

        if ((float) $data['customer_paid'] > 0) { // jika membayar dengan normal
            $transaction->fill([
                'isPaid' => 'Y',
                'customer_paid' => $data['customer_paid'],
            ]);
        }

        $transaction->save();
        $customer->save();

        return response()->json([
            'message' => "Do you want to send the receipt?",
            'transaction' => [
                'total_price' => $transaction->total_price,
                'total_hour' => $transaction->total_hour,
                'booking_code' => $transaction->booking_code,
                'isPaid' => $transaction->isPaid,
                'isDebt' => $transaction->isDebt,
                'isDeposit' => $transaction->isDeposit,
                'isPaymentDone' => ($transaction->isPaid == 'Y' || $transaction->isDebt == 'Y' || $transaction->isDeposit == 'Y'),
                'customer' => $transaction->relationLoaded('rentals') ?
                    [
                        'name' => $transaction->rentals->first()->customer->name,
                        'phone_number' => $transaction->rentals->first()->customer->phone_number,
                        'deposit' => $transaction->rentals->first()->customer->deposit ?? 0
                    ] :
                    null
            ]
        ], 202, ['success' => 'Paid Successfully']);
    }

    public function send_receipt(Request $request)
    {
        $data = $request->validate([ 'booking_code' => ['required', 'exists:tb_transaction,booking_code'] ]);

        $transaction = TransactionModel::select(['total_price', 'total_hour', 'booking_code', 'customer_paid', 'customer_deposit', 'customer_debt', 'created_at', 'id'])
            ->with(['rentals.customer:customer_code,name,phone_number,member_active_period', 'rentals.user:id,name', 'rentals:id,customer_id,transaction_id,user_id'])
            ->where('booking_code', $data['booking_code'])
            ->where(function ($query) {
                $query->where('isPaid', 'Y')
                    ->orWhere('isDebt', 'Y')
                    ->orWhere('isDeposit', 'Y');
            })
            ->firstOrFail();

        $customer = ['name' => '', 'phone_number' => '', 'member_active_period' => ''];
        $admin_name = '';

        if ($transaction->relationLoaded('rentals')) {
            $customer = [
                'name' => $transaction->rentals->first()->customer->name,
                'phone_number' => $transaction->rentals->first()->customer->phone_number,
                'member_active_period' => $transaction->rentals->first()->customer->member_active_period ?? '-'
            ];

            $admin_name = $transaction->rentals->first()->user->name;
        }

        $cs_paid = number_format((float) $transaction->customer_paid, 0, '.', '.');
        $cs_depo = number_format((float) $transaction->customer_deposit, 0, '.', '.');
        $cs_debt = number_format((float) $transaction->customer_debt, 0, '.', '.');

        $trx_price = number_format((float) $transaction->total_price, 0, '.', '.');

        $message = <<<EOT
        Tanggal sewa: {$transaction->created_at}
        Penyewa: {$customer['name']}
        Masa aktif member: {$customer['member_active_period']}

        kode booking: {$transaction->booking_code}
        Total harga: Rp $trx_price
        Durasi: {$transaction->total_hour} jam

        Bayar normal: Rp $cs_paid
        Pakai deposit: Rp $cs_depo
        berhutang: Rp $cs_debt

        Petugas: $admin_name
        EOT;

        $user_key = env('ZENZIVA_USER_KEY');
        $api_key = env('ZENZIVA_API_KEY');
        $response = $this->sendWA($customer['phone_number'], $message,  $user_key, $api_key);
        return response($response);
    }
}
