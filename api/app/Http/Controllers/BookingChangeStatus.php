<?php

namespace App\Http\Controllers;

use App\Models\RentalModel;
use App\Models\TransactionModel;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class BookingChangeStatus extends Controller
{
    public function start(Request $request)
    {
        $data = $request->validate([
            'id' => ['required', 'exists:tb_rental,id']
        ]);

        RentalModel::where('id', $data['id'])->where('status', 'B')->update([
            'status' => 'O'
        ]);

        return response()->json(['message' => 'Rental is on progress'], 202, ['success' => 'Rental is on progress.']);
    }

    public function finish(Request $request)
    {
        $data = $request->validate([
            'id' => ['required', 'exists:tb_rental,id']
        ]);

        RentalModel::where('id', $data['id'])->where('status', 'O')->update([
            'status' => 'F'
        ]);

        return response()->json(['message' => 'Rental finished'], 202, ['success' => 'Rental finished.']);
    }

    public function cancel(Request $request)
    {
        $data = $request->validate([
            'id' => ['required', 'exists:tb_rental,id']
        ]);

        $rental = RentalModel::where('id', $data['id'])->where('status', 'B')->first();

        $rental->update(['status' => 'C']);

        $transaction = TransactionModel::whereHas('rentals', function($query) use($data){
            $query->where('id', $data['id']);
        })->first();

        $transaction->update([
            'total_price' => (float) $transaction->total_price - (float) $rental->price,
            'total_hour' => (float) $transaction->total_hour - (Carbon::parse($rental->start, 'Asia/Jakarta')->floatDiffInHours($rental->finish))
        ]);

        return response()->json(['message' => 'Rental Canceled'], 202, ['success' => 'Rental finished.']);
    }
}
