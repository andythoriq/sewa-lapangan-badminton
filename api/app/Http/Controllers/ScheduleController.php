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
                    'transaction:id,booking_code,isPaid',
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
}
