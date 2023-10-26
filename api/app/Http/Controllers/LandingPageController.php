<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use App\Models\CourtModel;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class LandingPageController extends Controller
{
    public function __invoke(Request $request)
    {
        $courts = CourtModel::select(['id', 'label', 'initial_price', 'image_path', 'description'])
            ->get();

        $operational_time = [];
        $today = strtolower(Carbon::now('Asia/Jakarta')->dayName);
        foreach(ConfigModel::getOpenTime() as $schedule){
            if ($schedule['day'] === $today) {
                $operational_time = $schedule;
                break;
            }
        }

        $contact = ConfigModel::getContact();
        $gor_name = ConfigModel::getCompanyName();
        $contact['gor_name'] = $gor_name;

        return response()->json([
            'contact' => $contact,
            'courts' => $courts,
            'operational' => $operational_time ?: 'not_open_today'
        ]);
    }
}
