<?php

namespace App\Traits;

use Illuminate\Support\Carbon;
use App\Models\JadwalSewaModel;
use Illuminate\Validation\ValidationException;

trait ClashChecking
{
    public function collideCheck(string $start, string $end, int $court_id)
    {
        $newStart = Carbon::parse($start, 'Asia/Jakarta');
        $newEnd = Carbon::parse($end, 'Asia/Jakarta');

        $jadwal_sewa = JadwalSewaModel::select(['start', 'end'])->where('lapangan_id', $court_id)->get();

        foreach($jadwal_sewa as $field)
        {
            $existingStart = Carbon::parse($field->start);
            $existingEnd = Carbon::parse($field->end);

            if (
                ($newStart->between($existingStart, $existingEnd) || $newEnd->between($existingStart, $existingEnd)) ||
                ($existingStart->between($newStart, $newEnd) || $existingEnd->between($newStart, $newEnd))
            ) {
                throw ValidationException::withMessages([
                    'error' => ['Start dan End bentrok dengan waktu penyewaan yang sudah ada.'],
                ]);
            }
        }
    }
}
