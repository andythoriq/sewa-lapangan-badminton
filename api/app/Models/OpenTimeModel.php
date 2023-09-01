<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpenTimeModel extends Model
{
    use HasFactory;

    protected $table = 'tb_open_time';

    protected $fillable = [
        'start',
        'finish'
    ];
}
