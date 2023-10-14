<?php

namespace App\Http\Controllers\Master;

use App\Models\RentalModel;
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
            'rentals.court:id,label,initial_price'
        ])
            ->where('booking_code', $data['booking_code'])
            ->firstOrFail();

        return new BookingDetailResource($transactions);
    }

    public function pay(Request $request)
    {
        $data = $request->validate([
            'customer_deposit' => ['nullable', 'numeric'],
            'input_deposit' => ['nullable', 'numeric'],
            'customer_paid' => ['required', 'numeric'],
            'total_price' => ['required', 'numeric'],
            'phone_number' => ['required', 'exists:tb_customer,phone_number'],
            'booking_code' => ['required', 'exists:tb_transaction,booking_code'],
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
                'debt_at' => now('Asia/Jakarta')->format('Y-m-d H:i:s')
            ]);
        }

        if (isset($data['customer_deposit']) || (float) $data['customer_deposit'] > 0) { // jika bayarnya lebih, dijadikan deposit
            $customer->deposit += (float) $data['customer_deposit'];
        }

        if (isset($data['input_deposit']) || (float) $data['input_deposit'] > 0) { // jika depositnya dipakai
            $customer->deposit -= (float) $data['input_deposit'];
            $transaction->fill([
                'isDeposit' => 'Y',
                'customer_deposit' => $data['input_deposit'],
                'deposit_at' => now('Asia/Jakarta')->format('Y-m-d H:i:s')
            ]);
        }

        if (isset($data['customer_paid']) || (float) $data['customer_paid'] > 0) { // jika membayar dengan normal
            $transaction->fill([
                'isPaid' => 'Y',
                'customer_paid' => $data['customer_paid'],
                'paid_at' => now('Asia/Jakarta')->format('Y-m-d H:i:s')
            ]);
        }

        $transaction->save();
        $customer->save();

        return response()->json([
            'message' => 'Transaction done.',
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
}
