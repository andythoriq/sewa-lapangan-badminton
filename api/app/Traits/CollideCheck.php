<?php

namespace App\Traits;

use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

trait CollideCheck
{
    public function collideCheck(string $start, string $finish, iterable $schedules, $attr = 'start')
    {
        $newStart = Carbon::parse($start, 'Asia/Jakarta');
        $newFinish = Carbon::parse($finish, 'Asia/Jakarta');

        foreach($schedules as $schedule)
        {
            $existingStart = Carbon::parse($schedule->start, 'Asia/Jakarta');
            $existingFinish = Carbon::parse($schedule->finish, 'Asia/Jakarta');

            if (
                ($newStart->betweenExcluded($existingStart, $existingFinish) || $newFinish->betweenExcluded($existingStart, $existingFinish)) ||
                ($existingStart->betweenExcluded($newStart, $newFinish) || $existingFinish->betweenExcluded($newStart, $newFinish))
            ) {
                throw ValidationException::withMessages([
                    $attr => ['Start and Finish collide with existing ones.'],
                ]);
            }
        }
    }

    public function collideCheck2(string $start, string $finish, iterable $schedules, $fail)
    {
        $newStart = Carbon::parse($start, 'Asia/Jakarta');
        $newFinish = Carbon::parse($finish, 'Asia/Jakarta');

        foreach ($schedules as $schedule) {
            $existingStart = Carbon::parse($schedule->start, 'Asia/Jakarta');
            $existingFinish = Carbon::parse($schedule->finish, 'Asia/Jakarta');

            if (
                ($newStart->betweenExcluded($existingStart, $existingFinish) || $newFinish->betweenExcluded($existingStart, $existingFinish)) ||
                ($existingStart->betweenExcluded($newStart, $newFinish) || $existingFinish->betweenExcluded($newStart, $newFinish))
            ) {
                $fail('Start and Finish collide with existing ones.');
            }
        }
    }

    public function collideCheck3(string $start, string $finish, iterable $schedules)
    {
        $newStart = Carbon::parse($start, 'Asia/Jakarta');
        $newFinish = Carbon::parse($finish, 'Asia/Jakarta');

        foreach ($schedules as $schedule) {
            $existingStart = Carbon::parse($schedule->start, 'Asia/Jakarta');
            $existingFinish = Carbon::parse($schedule->finish, 'Asia/Jakarta');

            if (
                ($newStart->betweenExcluded($existingStart, $existingFinish) || $newFinish->betweenExcluded($existingStart, $existingFinish)) ||
                ($existingStart->betweenExcluded($newStart, $newFinish) || $existingFinish->betweenExcluded($newStart, $newFinish))
            ) {
                abort(403, 'Start and Finish collide with existing ones.');
            }
        }
    }

    public function createMultipleCollideCheck(array $rentals)
    {
        for ($i = 0; $i < count($rentals); $i++) {
            for ($j = $i + 1; $j < count($rentals); $j++) {
                if ($rentals[$i]['court_id'] == $rentals[$j]['court_id']) {
                    $start1 = Carbon::parse($rentals[$i]['start'], 'Asia/Jakarta');
                    $finish1 = Carbon::parse($rentals[$i]['finish'], 'Asia/Jakarta');
                    $start2 = Carbon::parse($rentals[$j]['start'], 'Asia/Jakarta');
                    $finish2 = Carbon::parse($rentals[$j]['finish'], 'Asia/Jakarta');

                    if (
                        ($start1->lt($finish2) && $finish1->gt($start2))
                        || ($start2->lt($finish1) && $finish2->gt($start1))
                    ) {
                        throw ValidationException::withMessages([
                            "rentals.$i.start" => ['Collide with the next one.'],
                            "rentals.$j.start" => ['Collide with the previous one.']
                        ]);
                    }
                }
            }
        }
    }
}
