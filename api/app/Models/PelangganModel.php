<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PelangganModel extends Model
{
    use HasFactory;

    protected $table = 'tb_pelanggan';

    protected $fillable = [
        'code_pelanggan',
        'nama',
        'no_telp',
        'deposit',
        'hutang',
        'status'
    ];

    // protected $with = ['rentals'];

    public function rentals(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(JadwalSewaModel::class, 'pelanggan_id', 'code_pelanggan');
    }
}
