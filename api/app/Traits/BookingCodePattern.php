<?php

namespace App\Traits;

use App\Models\TransactionModel;

trait BookingCodePattern
{
    public function getBookingCode() : string
    {
        $length = 10;
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = substr(str_shuffle($characters), 0, $length);

        $booking_code = 'GOR' . $randomString . TransactionModel::count();

        return $booking_code;
    }
}
