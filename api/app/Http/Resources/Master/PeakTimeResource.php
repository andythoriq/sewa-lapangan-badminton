<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class PeakTimeResource extends JsonResource
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
            'finish' => $this->finish,
            'price_increase' => $this->price_increase,
            'court' => [
                'label' => $this->court->label,
                'image_path' => $this->court->image_path,
                'description' => $this->court->description,
                'initial_price' => $this->court->initial_price
            ]
        ];
    }
}
