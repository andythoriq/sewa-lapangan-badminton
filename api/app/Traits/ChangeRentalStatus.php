<?php

namespace App\Traits;
use App\Models\RentalModel;
use Illuminate\Support\Carbon;

trait ChangeRentalStatus
{
    public function getAndChangeRentalStatus(string $rentalStart, string $rentalFinish, RentalModel $rental):string
    {
        $current = Carbon::now('Asia/Jakarta')->format('Y-m-d H:i:s');

        $start = Carbon::parse($rentalStart);
        $finish = Carbon::parse($rentalFinish);

        $status = 'B';

        if ($start->lt($current)) {
            $status = 'B'; // booked
        }
        else if ($start->gte($current) && $finish->lt($current)){
            $status = 'O'; // onprogress, turn on the lamp
        }
        else if ($finish->gte($current)) {
            $status = 'F'; // finished, turn off the lamp
        }
        $rental->update(['status' => $status]);
        return $status;
    }
}
