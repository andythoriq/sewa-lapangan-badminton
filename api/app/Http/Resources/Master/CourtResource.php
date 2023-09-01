<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class CourtResource extends JsonResource
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
            'description' => $this->description,
            'normal_price' => $this->normal_price,
            'rental' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'status' => $rental->status
            ])),
            'peak_time' => $this->whenLoaded('peak_times', fn() => collect($this->peak_times)->map(fn($peak_time) => [
                'id' => $peak_time->id,
                'start' => $peak_time->start,
                'finish' => $peak_time->finish
            ]))
        ];
    }
}
