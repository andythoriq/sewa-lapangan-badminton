<?php

namespace App\Traits;

use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

trait RentalDurationRule
{
    public function validateDuration(string $start, string $finish)
    {
        $start = Carbon::parse($start, 'Asia/Jakarta');
        $finish = Carbon::parse($finish, 'Asia/Jakarta');

        $minDuration = 60;
        $multipleOf = 30;

        if ($start->diffInMinutes($finish) < $minDuration) {
            throw ValidationException::withMessages([
                'start' => ['Start and Finish must be more than 1 hour.'],
            ]);
        }

        $minutesDiff = $start->diffInMinutes($finish);
        if ($minutesDiff % $multipleOf !== 0 || $start->minute % $multipleOf !== 0 || $finish->minute % $multipleOf !== 0) {
            throw ValidationException::withMessages([
                'start' => ['Start and Finish must be multiplied by 30 minutes.'],
            ]);
        }
    }
}
