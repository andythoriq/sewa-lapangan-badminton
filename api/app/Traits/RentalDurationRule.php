<?php

namespace App\Traits;

use App\Models\ConfigModel;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

trait RentalDurationRule
{
    public function validateDuration(string $start, string $finish)
    {
        $start = Carbon::parse($start, 'Asia/Jakarta');
        $finish = Carbon::parse($finish, 'Asia/Jakarta');

        $open_time = [];
        $today_l = strtolower(Carbon::now('Asia/Jakarta')->dayName);
        foreach (ConfigModel::getOpenTime() as $value) {
            if ($value['day'] === $today_l) {
                $open_time = $value;
            }
        }

        if ($start->floatDiffInHours($finish) > Carbon::parse($open_time['start'])->floatDiffInHours($open_time['finish'])) {
            throw ValidationException::withMessages([
                'start' => ['Start and Finish can\'t be more than operational time today.'],
            ]);
        }

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
