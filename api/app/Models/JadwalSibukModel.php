<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalSibukModel extends Model
{
    use HasFactory;

    protected $table = 'tb_jadwal_sibuk';

    protected $fillable = [
        'start',
        'end'
    ];

    protected $timestamps = false;

    // protected $with = ['lapangan'];

    public function lapangan(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(LapanganModel::class, 'lapangan_id', 'id');
    }
}
