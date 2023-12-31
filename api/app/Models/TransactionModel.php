<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionModel extends Model
{
    use HasFactory;

    protected $table = 'tb_transaction';

    protected $fillable = [
        'total_price',
        'total_hour',
        'booking_code',
        'qr_code_image',

        'isPaid',
        'customer_paid',

        'isDebt',
        'customer_debt',

        'isDeposit',
        'customer_deposit',
    ];

    public function rentals(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RentalModel::class, 'transaction_id', 'id');
    }
}
