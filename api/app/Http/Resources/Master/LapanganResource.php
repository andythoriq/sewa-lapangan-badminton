<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class LapanganResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public static $wrap = null;

    public function toArray($request)
    {
        return [
            'label' => $this->label,
            'image_path' => $this->image_path,
            'deskripsi' => $this->deskripsi,
            'harga_normal' => $this->harga_normal,
            'jadwal_sewa' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'end' => $rental->end,
                'status' => $rental->status
            ])),
            'jadwal_sibuk' => $this->whenLoaded('peak_times', fn() => collect($this->peak_times)->map(fn($jadwal) => [
                'id' => $jadwal->id,
                'start' => $jadwal->start,
                'end' => $jadwal->end
            ]))
        ];
    }
}
