<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OTPModel extends Model
{
    use HasFactory;

    protected $table = 'tb_otp_history';

    protected $fillable = [
        'otp_code',
        'customer_id'
    ];

    public function customer() : \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CustomerModel::class, 'customer_id', 'customer_code');
    }
}
