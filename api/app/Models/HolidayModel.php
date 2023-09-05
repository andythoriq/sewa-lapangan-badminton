<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HolidayModel extends Model
{
    use HasFactory;

    protected $table = 'tb_holiday';

    protected $fillable = [
        'label',
        'start',
        'finish'
    ];


}
