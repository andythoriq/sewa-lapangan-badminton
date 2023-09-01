<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CloseTimeModel extends Model
{
    use HasFactory;

    protected $table = 'tb_close_time';

    protected $fillable = [
        'label',
        'start',
        'finish'
    ];


}
