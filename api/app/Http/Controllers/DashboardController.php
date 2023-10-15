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

        $all_booked =  RentalModel::where('status', 'B');
        $finished_booking = RentalModel::whereDate('updated_at', $today)->where('status', 'F')->count();
        $onprogress_booking = RentalModel::where('status', 'O')->count();
        $upcoming_booking = RentalModel::whereDate('start', $today)->where('status', 'B')->count();
        $canceled_booking = RentalModel::whereDate('updated_at', $today)->where('status', 'C')->count();

        $received = RentalModel::whereDate('updated_at', $today)->where('status', 'F')->sum('price');
        $in_projection = $all_booked->sum('price');
        $yesterday_received = RentalModel::whereDate('updated_at', $yesterday)->where('status', 'F')->sum('price');

        $total_deposit = CustomerModel::sum('deposit');
        $total_debt = CustomerModel::sum('debt');

        $today_debt = TransactionModel::whereDate('updated_at', $today)->where('isDebt', 'Y')->sum('customer_debt');

        $today_total_booker_deposit = CustomerModel::whereHas('rentals', function($query) use($today){
            $query->whereDate('updated_at', $today)->where('status', '!=', 'C');
        })->sum('deposit');
        $today_deposit_used = TransactionModel::whereDate('updated_at', $today)->where('isDeposit', 'Y')->sum('customer_deposit');

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
            'today_debt' => $today_debt,
            'total_booker_deposit' => $today_total_booker_deposit,
            'deposit_used' => $today_deposit_used
        ]);
    }
}
