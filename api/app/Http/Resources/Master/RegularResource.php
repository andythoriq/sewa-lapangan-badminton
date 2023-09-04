<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class RegularResource extends JsonResource
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
            'name' => $this->name,
            'phone_number' => $this->phone_number,
            'deposit' => $this->deposit,
            'debt' => $this->debt,
            'status' => $this->status,
            'rental' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'price' => $rental->price,
                'status' => $rental->status,
            ]))
        ];
    }
}
