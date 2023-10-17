<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use App\Models\CourtModel;
use App\Models\RentalModel;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function __invoke(Request $request)
    {
        $config_open_time = ConfigModel::getOpenTime();

        $filtered_open_time = [];

        $today = strtolower(date("l"));

        foreach ($config_open_time as $value) {
            if ($value['day'] === $today) {
                $filtered_open_time = $value;
            }
        }

        $get_hours = $this->get_hours_array($filtered_open_time['start'], $filtered_open_time['finish']);

        $booking = RentalModel::whereDate('start', now('Asia/Jakarta')->format('Y-m-d'))->whereDate('finish', now('Asia/Jakarta')->format('Y-m-d'))
                ->select(['id', 'start', 'finish', 'price', 'status', 'court_id'])
                ->where('status', '!=', 'C')->get();

        $result = [];
        foreach ($booking as $key => $value) {
            $durations = strtotime($value['finish']) - strtotime($value['start']);
            for ($i=0; $i < $durations; $i += 1800) {
                $court_id = $value['court_id'] . '-' . date('H:i', strtotime($value['start']) + $i);
                array_push($result, ['court_id' => $court_id, 'rental_id' => $value['id'], 'status' => $value['status']]);
            }
        }

        $courts = CourtModel::select(['id AS value', 'label'])->get();

        return response()->json([
            'rentals' => $result,
            'courts' => $courts,
            'hours' => $get_hours,
        ]);
    }

    private function get_hours_array($open_str, $close_str) : array
    {
        $open_time = strtotime($open_str);
        $close_time = strtotime($close_str);
        // $now = time();
        $output = [];
        for ($i = $open_time; $i < $close_time; $i += 3600) {
            // if ($i < $now)
            //     continue;
            $output[] = [
                'id' => date('H', $i),
                'start' => date("H:i", $i + 60),
                'finish' => date("H:i", $i + 3600),
            ];
        }
        return $output;
    }
}
