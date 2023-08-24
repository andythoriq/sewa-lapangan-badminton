<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiModel extends Model
{
    use HasFactory;

    protected $table = 'tb_transaksi';

    // protected $with = [''];

    protected $fillable = [
        'total_harga',
        'total_jam'
    ];
}
