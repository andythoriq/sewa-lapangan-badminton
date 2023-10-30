<?php

namespace App\Traits;

use App\Models\ConfigModel;
use Illuminate\Support\Carbon;
// use Illuminate\Validation\ValidationException;

trait RentalDurationRule
{
    public function validateDuration($start, $finish, $fail)
    {
        $start = Carbon::parse($start, 'Asia/Jakarta');
        $finish = Carbon::parse($finish, 'Asia/Jakarta');

        $open_time = [];
        $rental_day_l = strtolower(Carbon::parse($start, 'Asia/Jakarta')->dayName);
        foreach (ConfigModel::getOpenTime() as $value) {
            if ($value['day'] === $rental_day_l) {
                $open_time = $value;
                break;
            }
        }

        if ($start->floatDiffInHours($finish) > Carbon::parse($open_time['start'])->floatDiffInHours($open_time['finish'])) {
            // throw ValidationException::withMessages([
            //     $attr => ['Start and Finish can\'t be more than ' . $rental_day_l . ' operational time.'],
            // ]);
            $fail('Start and Finish can\'t be more than ' . $rental_day_l . ' operational time.');
        }

        $minDuration = 60;
        $multipleOf = 30;

        if ($start->diffInMinutes($finish) < $minDuration) {
            // throw ValidationException::withMessages([
            //     $attr => ['Start and Finish must be more than 1 hour.'],
            // ]);
            $fail('Start and Finish must be more than 1 hour.');
        }

        $minutesDiff = $start->diffInMinutes($finish);
        if ($minutesDiff % $multipleOf !== 0 || $start->minute % $multipleOf !== 0 || $finish->minute % $multipleOf !== 0) {
            // throw ValidationException::withMessages([
            //     $attr => ['Start and Finish must be multiplied by 30 minutes.'],
            // ]);
            $fail('Start and Finish must be multiplied by 30 minutes.');
        }
    }
}
