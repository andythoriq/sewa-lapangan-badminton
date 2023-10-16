<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfigModel extends Model
{
    use HasFactory;

    protected $table = 'tb_configuration';

    protected $fillable = [
        'slug',
        'description',
        'value'
    ];

    public static function getOpenTime()
    {
        $open_time = self::where('slug', 'open_time')->first();
        if (empty($open_time)) {
            $open_time = self::where('id', 1)->first();
        }
        return json_decode($open_time->value, true);
    }

    public static function getExpireDuration()
    {
        $expire_otp = self::where('slug', 'expire_duration')->first();
        if (empty($expire_otp)) {
            $expire_otp = self::where('id', 4)->first();
        }
        return (int) ($expire_otp->value ?? 10);
    }

    public static function getMemberDiscount()
    {
        $member_discount = self::where('slug', 'member_discount')->first();
        if (empty($member_discount)) {
            $member_discount = self::where('id', 5)->first();
        }
        return (int) ($member_discount->value ?? 10);
    }

    public static function getResendLimit()
    {
        $resend_limit = self::where('slug', 'resend_limit')->first();
        if (empty($resend_limit)) {
            $resend_limit = self::where('id', 6)->first();
        }
        return (int) ($resend_limit->value ?? 3);
    }

    public static function getCompanyName()
    {
        $name = self::where('slug', 'name')->first();
        if (empty($name)) {
            $name = self::where('id', 2)->first();
        }
        return (string) ($name->value ?? '');
    }

    public static function getContact()
    {
        $contact = self::where('slug', 'contact')->first();
        if (empty($contact)) {
            $contact = self::where('id', 3)->first();
        }
        return json_decode($contact->value, true);
    }
}
