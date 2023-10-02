<?php

namespace App\Http\Controllers;

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

            $customer_count = CustomerModel::count();

            $booking_today_count = RentalModel::whereDate('start', '<=', $today)
                                        ->whereDate('finish', '>=', $today)->count();

        $transaction_paid = TransactionModel::where('isPaid', 'Y')->sum('customer_paid');
        $transaction_debt = TransactionModel::where('isDebt', 'Y')->sum('customer_debt');
            $total_income_all = $transaction_paid - $transaction_debt;

        $transaction_paid_today = TransactionModel::whereDate('created_at', $today)
                                                ->where('isPaid', 'Y')
                                                ->sum('customer_paid');

        $transaction_debt_today = TransactionModel::whereDate('created_at', $today)
                                                ->where('isDebt', 'Y')
                                                ->sum('customer_debt');

            $total_income_today = $transaction_paid_today - $transaction_debt_today;


        return response()->json([
            'customer_count' => $customer_count,
            'booking_today_count' => $booking_today_count,
            'total_income_all' => $total_income_all,
            'total_income_today' => $total_income_today
        ]);
    }
}
