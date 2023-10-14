<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use App\Models\CustomerModel;
use App\Models\RentalModel;
use App\Models\TransactionModel;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $today = now('Asia/Jakarta')->format('Y-m-d');
        $yesterday = now('Asia/Jakarta')->subDay()->format('Y-m-d');

        $booking_today = RentalModel::whereDate('start', $today)->OrWhereDate('finish', $today);

        $all_booked =  RentalModel::where('status', 'B');
        $finished_booking = $booking_today->where('status', 'F')->count();
        $onprogress_booking = $booking_today->where('status', 'O')->count();
        $upcoming_booking = $booking_today->where('status', 'B')->count();
        $canceled_booking = $booking_today->where('status', 'C')->count();

        $received = $booking_today->where('status', 'F')->sum('price');
        $in_projection = $all_booked->sum('price');
        $yesterday_received = RentalModel::whereDate('finish', $yesterday)->where('status', 'F')->sum('price');

        $total_deposit = CustomerModel::sum('deposit');
        $total_debt = CustomerModel::sum('debt');

        $today_total_booker_deposit = CustomerModel::whereHas('rentals', function($query) use($today){
            $query->whereDate('start', $today)->orWhereDate('finish', $today)->where('status', '!=', 'C');
        })->sum('deposit');
        $today_deposit_used = TransactionModel::whereDate('deposit_at', $today)->where('isDeposit', 'Y')->sum('customer_deposit');

        return response()->json([
            'company_name' => ConfigModel::getCompanyName(),
            'all_booked' => $all_booked->count(),
            'finished' => $finished_booking,
            'onprogress' => $onprogress_booking,
            'upcoming' => $upcoming_booking,
            'canceled' => $canceled_booking,
            'received' => $received,
            'in_projection' => $in_projection,
            'yesterday_received' => $yesterday_received,
            'total_deposit' => $total_deposit,
            'total_debt' => $total_debt,
            'total_booker_deposit' => $today_total_booker_deposit,
            'deposit_used' => $today_deposit_used
        ]);
    }
}
