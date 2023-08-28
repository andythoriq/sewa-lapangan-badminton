<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JadwalSewaModel extends Model
{
    use HasFactory;

    protected $table = 'tb_jadwal_sewa';

    protected $fillable = [
        'start',
        'end',
        'status'
    ];

    public $timestamps = false;

    // protected $with = ['transaksi', 'pelanggan', 'lapangan'];

    public function transaksi(): BelongsTo
    {
        return $this->belongsTo(TransaksiModel::class, 'transaksi_id', 'id');
    }

    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(PelangganModel::class, 'pelanggan_id', 'code_pelanggan');
    }

    public function lapangan(): BelongsTo
    {
        return $this->belongsTo(LapanganModel::class, 'lapangan_id', 'id');
    }


}
