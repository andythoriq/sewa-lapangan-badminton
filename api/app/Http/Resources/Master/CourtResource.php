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
            'initial_price' => $this->initial_price,
            'rentals' => $this->whenLoaded('rentals', function () {
                return collect($this->rentals)->map(function ($rental) {
                    return [
                        'id' => $rental->id,
                        'start' => $rental->start,
                        'finish' => $rental->finish,
                        'status' => $rental->status,
                        'price' => $rental->price
                    ];
                });
            }),
            'peak_times' => $this->whenLoaded('peak_times', fn () => collect($this->peak_times)->map(fn ($peak_time) => [
                'id' => $peak_time->id,
                'start' => $peak_time->start,
                'finish' => $peak_time->finish
            ]))
        ];
    }
}
