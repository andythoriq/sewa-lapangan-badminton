<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
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
}
