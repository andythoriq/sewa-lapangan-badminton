<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class PelangganResource extends JsonResource
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
        $result = [
            'nama' => $this->nama,
            'no_telp' => $this->no_telp,
            'deposit' => $this->deposit,
            'hutang' => $this->hutang,
            'jadwal_sewa' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'end' => $rental->end,
                'status' => $rental->status
            ]))
        ];
        if (isset($this->masa_aktif_member)) {
            $result['masa_aktif_member'] = $this->masa_aktif_member;
        }
        return $result;
    }
}
