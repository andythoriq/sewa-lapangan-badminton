<?php

namespace App\Traits;
use Illuminate\Support\Carbon;

trait ChangeRentalStatus
{
    public function getAndChangeRentalStatus(string $rentalStart, string $rentalFinish, object $rental):string
    {
        $current = Carbon::parse(now('Asia/Jakarta')->format('Y-m-d H:i:s'));

        $start = Carbon::parse($rentalStart);
        $finish = Carbon::parse($rentalFinish);

        $status = 'B';

        if ($current->lt($start)) {
            $status = 'B'; // booked
        }
        else if ($current->between($start, $finish)){
            $status = 'O'; // onprogress, turn on the lamp
        }
        else if ($current->gt($finish)) {
            $status = 'F'; // finished, turn off the lamp
        }
        $rental->update(['status' => $status]);
        return $status;
    }
}
