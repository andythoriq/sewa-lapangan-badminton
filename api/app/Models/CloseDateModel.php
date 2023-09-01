<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CloseDateModel extends Model
{
    use HasFactory;

    protected $table = 'tb_close_date';

    protected $fillable = [
        'label',
        'start',
        'finish'
    ];


}
