<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class JadwalSibukResource extends JsonResource
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
            'start' => $this->start,
            'end' => $this->end,
            'lapangan' => [
                'label' => $this->lapangan->label,
                'image_path' => $this->lapangan->image_path,
                'deskripsi' => $this->lapangan->deskripsi,
                'harga_normal' => $this->lapangan->harga_normal
            ]
        ];
    }
}
