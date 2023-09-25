<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingDetailResource;
use App\Http\Resources\Master\TransactionCollection;
use App\Http\Resources\Master\TransactionResource;
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

    public function booking_verification(Request $request)
    {
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
