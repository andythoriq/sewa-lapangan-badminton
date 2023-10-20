<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use App\Models\CourtModel;
use App\Models\RentalModel;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ScheduleController extends Controller
{
    public function __invoke(Request $request)
    {
        $f_courts = $request->input('courts'); // filter by courts (id)
        $f_date = $request->input('date'); // filter by date Y-m-d
        $f_statuses = $request->input('statuses'); // filter by status (B, O, F)

        $today_l = $f_date ? strtolower(Carbon::parse($f_date, 'Asia/Jakarta')->dayName) : strtolower(Carbon::now('Asia/Jakarta')->dayName);

        $today_Y_m_d = now('Asia/Jakarta')->format('Y-m-d');

        $config_open_time = ConfigModel::getOpenTime();

        $filtered_open_time = [];

        foreach ($config_open_time as $value) {
            if ($value['day'] === $today_l) {
                $filtered_open_time = $value;
                break;
            }
        }

        $get_hours = $this->get_hours_array(isset($filtered_open_time['start'])?$filtered_open_time['start']:"01:00", isset($filtered_open_time['finish'])?$filtered_open_time['finish']:"23:00");

        $booking = RentalModel::when($f_courts, function ($query) use ($f_courts) {
            $query->whereIn('court_id', explode(',', $f_courts));
        })
        ->when($f_date, function ($query) use ($f_date) {
            $query->whereDate('start', $f_date)->whereDate('finish', $f_date);
        })
        ->when($f_statuses, function ($query) use ($f_statuses) {
            $query->whereIn('status', explode(',', $f_statuses));
        })
        ->select(['id', 'start', 'finish', 'price', 'status', 'court_id'])
        ->where('status', '!=', 'C');

        if (!isset($f_date)) {
            $booking->whereDate('start', $today_Y_m_d)->whereDate('finish', $today_Y_m_d);
        }

        $booking = $booking->get();

        $courts = CourtModel::when($f_courts, function ($query) use ($f_courts) {
            $query->whereIn('id', explode(',', $f_courts));
        })
        ->select(['id', 'label']);

        $courts = $courts->get();

        $result = [];
        foreach ($booking as $key => $value) {
            $durations = strtotime($value['finish']) - strtotime($value['start']);
            for ($i=0; $i < $durations; $i += 1800) {
                $court_id = $value['court_id'] . '-' . date('H:i', strtotime($value['start']) + $i);
                array_push($result, ['court_id' => $court_id, 'rental_id' => $value['id'], 'status' => $value['status']]);
            }
        }

        $response = [
            'rentals' => $result,
            'courts' => $courts,
            'hours' => $get_hours,
        ];

        if (empty($filtered_open_time['start']) || empty($filtered_open_time['finish'])) {
            $response['alert'] = ['message' => ['No booking outside operational hours.']];
        }

        return response()->json($response);
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
    private $status_color = ['O' => "#FF6B00", 'F' => "#24ff00", 'B' => "#00ffff"];
}
