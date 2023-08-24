<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LapanganModel extends Model
{
    use HasFactory;

    protected $table = 'tb_lapangan';

    protected $fillable = [
        'label',
        'deskripsi',
        'harga_normal'
    ];

    protected $with = ['rentals', 'peak_times'];

    public function rentals(): HasMany
    {
        return $this->hasMany(JadwalSewaModel::class, 'lapangan_id', 'id');
    }

    public function peak_times(): HasMany
    {
        return $this->hasMany(JadwalSibukModel::class, 'lapangan_id', 'id');
    }
}
