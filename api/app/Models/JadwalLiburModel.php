<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalLiburModel extends Model
{
    use HasFactory;

    protected $table = 'tb_jadwal_libur';

    protected $fillable = [
        'label',
        'start',
        'end'
    ];

    public $timestamps = false;
}
