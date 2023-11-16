<?php

namespace App\Http\Controllers;

use App\Models\RentalModel;
use App\Models\TransactionModel;
use App\Traits\CollideCheck;
use App\Traits\PeakTimeCheck;
use App\Traits\RentalPriceCalculation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ChangeStatusController extends Controller
{
    use PeakTimeCheck, RentalPriceCalculation, CollideCheck;

    public function start(Request $request)
    {
        $data = $request->validate([
            'id' => ['required', 'exists:tb_rental,id']
        ]);

        $rental = RentalModel::where('id', $data['id'])->where('status', 'B')->first();
        $priceBefore = (float) $rental->price;

        $now = Carbon::now('Asia/Jakarta');

        if ($now->minute >= 0 && $now->minute <= 14) {
            $now->minute = 0;
            $now->second = 0;
        } else if ($now->minute >= 15 && $now->minute <= 29) {
            $now->minute = 30;
            $now->second = 0;
        } else if ($now->minute >= 30 && $now->minute <= 44) {
            $now->minute = 30;
            $now->second = 0;
        } else {
            $now->minute = 0;
            $now->second = 0;
            $now->addHour();
        }

        $new_finish = $now->copy()->addHours($rental->hour);

        $this->collideCheck3($now->format('Y-m-d H:i:s'), $new_finish->format('Y-m-d H:i:s'), $this->getCourtSchedules($rental->court_id, $rental->id));

        $validated_price = $this->getPeakTimePrice($rental->court_id, $now->dayName);
        $new_price = $this->getCost($now->format('Y-m-d H:i:s'), $new_finish->format('Y-m-d H:i:s'), $validated_price);

        $rental->update([
            'status' => 'O',
            'start' => $now,
            'finish' => $new_finish,
            'price' => $new_price,
        ]);

        $transaction = TransactionModel::whereHas('rentals', function ($query) use ($data) {
            $query->where('id', $data['id']);
        })->first();

        $transaction->update([ 'total_price' => (float) $transaction->total_price - $priceBefore + $new_price ]);

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

    public function force_finish(Request $request)
    {
        $data = $request->validate([
            'id' => ['required', 'exists:tb_rental,id']
        ]);

        $now = Carbon::now('Asia/Jakarta');

        $rental = RentalModel::where('id', $data['id'])->where('status', 'O')->first();
        $priceBefore = (float) $rental->price;
        $hourBefore = (float) $rental->hour;

        if ($now->minute >= 0 && $now->minute <= 44) {
            $updated_finish = $now->copy()->startOfHour()->addMinutes(30);
        } else {
            $updated_finish = $now->copy()->addHour()->startOfHour();
        }

        $updated_hour = Carbon::parse($rental->start, 'Asia/Jakarta')->floatDiffInHours($updated_finish);

        $validated_price = $this->getPeakTimePrice($rental->court_id, $now->dayName);
        $updated_price = $this->getCost($rental->start, $updated_finish->format('Y-m-d H:i:s'), $validated_price);

        $rental->update([
            'status' => 'F',
            'finish' => $updated_finish,
            'price' => $updated_price,
            'hour' => $updated_hour,
        ]);

        $transaction = TransactionModel::whereHas('rentals', function($query) use($data){
            $query->where('id', $data['id']);
        })->first();

        $transaction->update([
            'total_price' => (float) $transaction->total_price - $priceBefore + $updated_price,
            'total_hour' => (float) $transaction->total_hour - $hourBefore + $updated_hour
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
            'total_hour' => (float) $transaction->total_hour - (float) $rental->hour
        ]);

        return response()->json(['message' => 'Rental Canceled'], 202, ['success' => 'Rental finished.']);
    }

    private function getCourtSchedules(?int $court_id, $rental_id)
    {
        return RentalModel::select(['start', 'finish'])->where('court_id', $court_id)->where('id', '!=', $rental_id)->whereNotIn('status', ['C', 'F'])->get();
    }
}
