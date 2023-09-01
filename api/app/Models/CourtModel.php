<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourtModel extends Model
{
    use HasFactory;

    protected $table = 'tb_court';

    protected $fillable = [
        'label',
        'image_path',
        'description',
        'normal_price'
    ];

    public function rentals(): HasMany
    {
        return $this->hasMany(RentalModel::class, 'court_id', 'id');
    }

    public function peak_times(): HasMany
    {
        return $this->hasMany(RentalModel::class, 'court_id', 'id');
    }
}
