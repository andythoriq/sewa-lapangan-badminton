<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerModel extends Model
{
    use HasFactory;

    protected $table = 'tb_customer';

    protected $fillable = [
        'customer_code',
        'name',
        'phone_number',
        'deposit',
        'debt',
        'status',
        'member_active_period',
        'member_booking_code'
    ];

    protected $primaryKey = 'customer_code';

    protected $keyType = "string";

    public function rentals(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RentalModel::class, 'customer_id', 'customer_code');
    }
}
