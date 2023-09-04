<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RentalModel extends Model
{
    use HasFactory;

    protected $table = 'tb_rental';

    protected $fillable = [
        'start',
        'finish',
        'status',
        'price',
        'court_id',
        'transaction_id',
        'customer_id',
        'user_id'
    ];

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(TransactionModel::class, 'transaction_id', 'id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(CustomerModel::class, 'customer_id', 'customer_code');
    }

    public function court(): BelongsTo
    {
        return $this->belongsTo(CourtModel::class, 'court_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
