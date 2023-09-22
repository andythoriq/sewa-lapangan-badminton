<?php

namespace App\Traits;

use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

trait CollideCheck
{
    public function collideCheck(string $start, string $finish, iterable $schedules)
    {
        $newStart = Carbon::parse($start);
        $newFinish = Carbon::parse($finish);

        foreach($schedules as $schedule)
        {
            $existingStart = Carbon::parse($schedule->start);
            $existingFinish = Carbon::parse($schedule->finish);

            if (
                ($newStart->between($existingStart, $existingFinish) || $newFinish->between($existingStart, $existingFinish)) ||
                ($existingStart->between($newStart, $newFinish) || $existingFinish->between($newStart, $newFinish))
            ) {
                throw ValidationException::withMessages([
                    'start' => ['Start and Finish collide with existing ones.'],
                ]);
            }
        }
    }
}
