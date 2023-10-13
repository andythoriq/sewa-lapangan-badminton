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

    public static function notifyRegularBooking($customer_name, $start, $finish, $total_hour, $total_price)
    {
        $formatted_price = number_format((float) $total_price, 0, '.', '.');
        self::create([
            'label' => 'Customer Booking!',
            'value' => <<<EOT
            name        : $customer_name \n
            start at    : $start \n
            finish at   : $finish \n
            total hour  : $total_hour \n
            total price : Rp $formatted_price
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function notifyMemberBooking($customer_name, $total_hour, $total_price, $amount)
    {
        $formatted_price = number_format((float) $total_price, 0, '.', '.');
        self::create([
            'label' => 'Member Customer Booking!',
            'value' => <<<EOT
            name        : $customer_name \n
            amount      : $amount \n
            total hour  : $total_hour \n
            total price : Rp $formatted_price
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function customerRegistered($name, $phone_number, $membership_status)
    {
        $value = $membership_status === 'M' ? 'New Member Customer Registered' : 'New Regular Customer Registered';
        self::create([
            'label' => $value,
            'value' => <<<EOT
            name          : $name \n
            phone number  : $phone_number
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function customerLoggedIn($name, $phone_number, $membership_status)
    {
        $value = $membership_status === 'M' ? 'Member Customer Logged in' : 'New Regular Customer Logged in';
        self::create([
            'label' => $value,
            'value' => <<<EOT
            name         : $name \n
            phone number : $phone_number
            EOT,
            'read_status' => 'N'
        ]);
    }

}
