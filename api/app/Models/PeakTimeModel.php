<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeakTimeModel extends Model
{
    use HasFactory;

    protected $table = 'tb_peak_time';

    protected $fillable = [
        'start',
        'finish',
        'court_id',
        'price_increase',
        'day_name'
    ];

    public function court(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CourtModel::class, 'court_id', 'id');
    }
}
