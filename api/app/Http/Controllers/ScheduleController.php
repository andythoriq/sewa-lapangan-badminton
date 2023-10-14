<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Models\ConfigModel;
use App\Models\RentalModel;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function __invoke(Request $request)
    {
        $config_open_time = ConfigModel::getOpenTime();

        $filtered_open_time = [];

        $today = strtolower(date("l"));

        $string_to_array = json_decode($config_open_time, true);

        foreach ($string_to_array as $value) {
            if ($value['day'] === $today) {
                $filtered_open_time = $value;
            }
        }

        $booking = RentalModel::whereDate('start', now('Asia/Jakarta')->format('Y-m-d'))
                ->select(['id', 'start', 'finish', 'price', 'status', 'transaction_id', 'customer_id', 'court_id', 'user_id'])
                ->with([
                    'transaction:id,booking_code,isPaid,customer_paid,isDebt,customer_debt,isDeposit,customer_deposit',
                    'customer:customer_code,name,phone_number',
                    'court:id,label,initial_price',
                    'user:id,name,username,role_id',
                    'user.role:id,label'
                ])
                ->get();

        return new ScheduleResource([
            'booking' => $booking,
            'schedule' => $filtered_open_time
        ]);
    }

    private function get_hours_array($open_str, $close_str) : array
    {
        $open_time = strtotime($open_str);
        $close_time = strtotime($close_str);
        $now = time();
        $output = [];
        for ($i = $open_time; $i < $close_time; $i += 3600) {
            if ($i < $now)
                continue;
            $output[] = [
                'start' => date("H:i", $i + 60),
                'finish' => date("H:i", $i + 3600)
            ];
        }
        return $output;
    }
}
