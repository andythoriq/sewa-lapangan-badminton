<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CustomerModel extends User
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $table = 'tb_customer';

    protected $fillable = [
        'customer_code',
        'name',
        'phone_number',
        'deposit',
        'debt',
        'membership_status',
        'status',
        'member_active_period',
        'otp_code',
        'expiration'
    ];

    protected $primaryKey = 'customer_code';

    protected $keyType = "integer";

    public $incrementing = false;

    protected $hidden = [
        // 'password',
        'remember_token',
    ];

    public function rentals(): HasMany
    {
        return $this->hasMany(RentalModel::class, 'customer_id', 'customer_code');
    }

    public function otp_codes() : HasMany
    {
        return $this->hasMany(OTPModel::class, 'customer_id', 'customer_code');
    }
}
