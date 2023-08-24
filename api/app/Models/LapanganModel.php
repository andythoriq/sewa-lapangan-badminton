<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LapanganModel extends Model
{
    use HasFactory;

    protected $table = 'tb_lapangan';

    // protected $with = [''];

    protected $fillable = [
        'label',
        'deskripsi',
        'harga_normal'
    ];
}
