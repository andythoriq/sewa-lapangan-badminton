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
        'paid_at',

        'isDebt',
        'customer_debt',
        'debt_at',

        'isDeposit',
        'customer_deposit',
        'deposit_at'
    ];

    public function rentals(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RentalModel::class, 'transaction_id', 'id');
    }
}
