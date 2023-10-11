<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationModel extends Model
{
    use HasFactory;

    protected $table = 'tb_notification';

    protected $fillable = [
        'label',
        'value',
        'read_status'
    ];

    public static function notifyRegularBooking($customer_name, $court_name, $start, $finish, $total_hour, $total_price)
    {
        $formatted_price = number_format((float) $total_price, 0, '.', '.');
        self::create([
            'value' => 'Regular Customer Booking!',
            'description' => <<<EOT
            name        : $customer_name
            court       : $court_name
            start at    : $start
            finish at   : $finish
            total hour  : $total_hour
            total price : Rp $formatted_price
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function notifyMemberBooking($customer_name, $total_hour, $total_price, $amount)
    {
        $formatted_price = number_format((float) $total_price, 0, '.', '.');
        self::create([
            'value' => 'Member Customer Booking!',
            'description' => <<<EOT
            name        : $customer_name
            amount      : $amount
            total hour  : $total_hour
            total price : Rp $formatted_price
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function customerRegistered($name, $phone_number, $membership_status, $now)
    {
        $value = $membership_status === 'M' ? 'New Member Customer Registered' : 'New Regular Customer Registered';
        self::create([
            'value' => $value,
            'description' => <<<EOT
            name          : $name
            phone number  : $phone_number
            registered at : $now
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function customerLoggedIn($name, $phone_number, $membership_status, $now)
    {
        $value = $membership_status === 'M' ? 'Member Customer Logged in' : 'New Regular Customer Logged in';
        self::create([
            'value' => $value,
            'description' => <<<EOT
            name         : $name
            phone number : $phone_number
            logged in at : $now
            EOT,
            'read_status' => 'N'
        ]);
    }

}
