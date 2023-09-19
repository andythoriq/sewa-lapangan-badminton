<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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
        'otp_code'
    ];

    protected $primaryKey = 'customer_code';

    protected $keyType = "string";

    public $incrementing = false;

    protected $hidden = [
        // 'password',
        'remember_token',
    ];

    public function rentals(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RentalModel::class, 'customer_id', 'customer_code');
    }
}
