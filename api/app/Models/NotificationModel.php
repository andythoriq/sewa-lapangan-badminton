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
            name        : $customer_name
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
            'label' => 'Customer Multiple Booking!',
            'value' => <<<EOT
            name        : $customer_name
            amount      : $amount
            total hour  : $total_hour
            total price : Rp $formatted_price
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function customerRegistered($name, $phone_number)
    {
        self::create([
            'label' => 'Customer Registered',
            'value' => <<<EOT
            name          : $name
            phone number  : $phone_number
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function customerLoggedIn($name, $phone_number, $membership_status)
    {
        $value = $membership_status === 'M' ? 'Member Customer Logged in' : 'Regular Customer Logged in';
        self::create([
            'label' => $value,
            'value' => <<<EOT
            name         : $name
            phone number : $phone_number
            EOT,
            'read_status' => 'N'
        ]);
    }

    public static function getNotifications()
    {
        return self::select(['id', 'label', 'value', 'read_status', 'created_at'])->orderBy('created_at', 'desc')->get();
    }

    public static function getUnreadCount()
    {
        return self::where('read_status', 'N')->count();
    }
}
