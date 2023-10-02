<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingDetailResource;
use App\Http\Resources\Master\RentalCollection;
use App\Http\Resources\Master\TransactionCollection;
use App\Http\Resources\Master\TransactionResource;
use App\Models\RentalModel;
use App\Models\TransactionModel;
use Illuminate\Http\Request;

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
            $query->where('start', 'like', '%' . $keyword . '%')
                ->orWhere('finish', 'like', '%' . $keyword . '%')
                ->orWhereHas('customer', function ($customer) use ($keyword) {
                    $customer->where('name', 'like', '%' . $keyword . '%')
                        ->orWhere('phone_number', 'like', '%' . $keyword . '%');
                })
                ->orWhereHas('court', function ($court) use ($keyword) {
                    $court->where('label', 'like', '%' . $keyword . '%')
                        ->orWhere('initial_price', 'like', '%' . $keyword . '%');
                });

        })
            ->select(['id', 'start', 'finish', 'price', 'status', 'transaction_id', 'customer_id', 'court_id'])
            ->where('status', 'F')
            ->with([
                'transaction:id,total_price,total_hour,booking_code,customer_paid,customer_debt',
                'customer:customer_code,name,phone_number',
                'court:id,label,initial_price'
            ])
            ->get();
        return new RentalCollection($rentals);
    }

    public function booking_verification(Request $request, string $booking_code = '')
    {
        if (! $request->input('booking_code') && $booking_code) {
            $request->merge(['booking_code' => $booking_code]);
        }

        $data = $request->validate([
            'booking_code' => ['required', 'string', 'exists:tb_transaction,booking_code']
        ]);

        $transactions = TransactionModel::with([
            'rentals',
            'rentals.customer:customer_code,name,phone_number',
            'rentals.user:id,name,username',
            'rentals.court:id,label'
        ])
        ->where('booking_code', $data['booking_code'])->firstOrFail();

        return new BookingDetailResource($transactions);
    }
}
