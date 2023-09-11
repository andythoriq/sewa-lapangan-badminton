<?php

namespace App\Traits;

use Illuminate\Support\Carbon;

trait RentalPriceCalculation
{
    public function getCost(string $start, string $finish, float $court_initial_price = 10_000.00)
    {

        $duration = Carbon::parse($start)->diffInMinutes(Carbon::parse($finish));

        $price_per_30_mnt = $court_initial_price / 2;

        $total_cost = $court_initial_price;

        if ($duration > 60) {
            // calculate price per 30 minutes for rest duration
            $rest_duration = $duration - 60;
            $total_cost += ceil($rest_duration / 30) * $price_per_30_mnt;
        }

        return $total_cost;
    }
}
