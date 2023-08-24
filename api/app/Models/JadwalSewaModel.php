<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalSewaModel extends Model
{
    use HasFactory;

    protected $table = 'tb_jadwal_sewa';

    // protected $with = [''];

    protected $fillable = [
        'start',
        'end'
    ];

    protected $timestamps = false;
}
