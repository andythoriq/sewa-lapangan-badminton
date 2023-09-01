<?php

namespace App\Traits;

use Illuminate\Support\Carbon;
use App\Models\RentalModel;
use Illuminate\Validation\ValidationException;

trait ClashChecking
{
    public function collideCheck(string $start, string $finish, int $court_id)
    {
        $newStart = Carbon::parse($start, 'Asia/Jakarta');
        $newFinish = Carbon::parse($finish, 'Asia/Jakarta');

        $rental = RentalModel::select(['start', 'finish'])->where('court_id', $court_id)->get();

        foreach($rental as $court)
        {
            $existingStart = Carbon::parse($court->start);
            $existingFinish = Carbon::parse($court->finish);

            if (
                ($newStart->between($existingStart, $existingFinish) || $newFinish->between($existingStart, $existingFinish)) ||
                ($existingStart->between($newStart, $newFinish) || $existingFinish->between($newStart, $newFinish))
            ) {
                throw ValidationException::withMessages([
                    'error' => ['Start dan Finish bentrok dengan yang sudah ada.'],
                ]);
            }
        }
    }
}
