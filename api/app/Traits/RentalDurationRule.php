<?php

namespace App\Traits;

use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

trait RentalDurationRule
{
    public function validateDuration(string $start, string $finish)
    {
        $start = Carbon::parse($start);
        $finish = Carbon::parse($finish);

        $minDuration = 60;
        $multipleOf = 30;

        if ($start->diffInMinutes($finish) < $minDuration) {
            throw ValidationException::withMessages([
                'start' => ['Start and Finish must be more than 1 hour.'],
            ]);
        }

        if ($start->diffInMinutes($finish) % $multipleOf !== 0) {
            throw ValidationException::withMessages([
                'start' => ['Start and Finish must be multiplied by 30 minutes.'],
            ]);
        }
    }
}
