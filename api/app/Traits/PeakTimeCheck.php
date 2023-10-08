<?php

namespace App\Traits;
use App\Models\CourtModel;
use Illuminate\Support\Carbon;

trait PeakTimeCheck
{
    public function getPeakTimePrice($court_id, $today)
    {
        $court = CourtModel::find($court_id);

        if ($court->peak_times->isEmpty()) {
            return $court->initial_price;
        }

        $peak_time = $court->peak_times->where('day_name', strtolower($today))->first();

        if (! $peak_time) {
            return $court->initial_price;
        }

        if (Carbon::now('Asia/Jakarta')->between(Carbon::parse($peak_time->start), Carbon::parse($peak_time->finish))) {
            return $peak_time->price_increase;
        } else {
            return $court->initial_price;
        }
    }
}
