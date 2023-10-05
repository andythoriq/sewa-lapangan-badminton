<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use Illuminate\Http\Request;
use App\Http\Resources\ScheduleCollection;

class ScheduleController extends Controller
{
    public function __invoke(Request $request)
    {
        $config_open_time = ConfigModel::where('slug', 'open-time')->first();

        return $config_open_time->value;

        $filtered_open_time = [];

        $today = strtolower(date("l"));

        $string_to_array = $config_open_time->value;

        foreach ($string_to_array as $value) {
            if ($value['day'] === $today) {
                $filtered_open_time = $value;
            }
        }

        return $filtered_open_time;

        $booking = RentalModel::where('')->get();


        return new ScheduleCollection($booking);
    }
}
