<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PeakTimeCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = null;
    public function toArray($request)
    {
        return $this->collection->map(function ($peak_time) {
            return [
                'id' => $peak_time->id,
                'start' => $peak_time->start,
                'finish' => $peak_time->finish,
                'day_name' => $peak_time->day_name,
                'price_increase' => $peak_time->price_increase,
                'court' => [
                    'label' => $peak_time->court->label,
                    'initial_price' => $peak_time->court->initial_price
                ]
            ];
        });
    }
}
