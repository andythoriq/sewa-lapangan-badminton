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
        $open_time = self::where('slug', 'open-time')->first();
        if (empty($open_time)) {
            $open_time = self::where('id', 1)->first();
        }
        return $open_time;
    }

    public static function getExpireDuration()
    {
        $expire_otp = self::where('slug', 'expire-duration')->first();
        if (empty($expire_otp)) {
            $expire_otp = self::where('id', 4)->first();
        }
        return $expire_otp;
    }
}
