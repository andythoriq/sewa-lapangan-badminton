<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'phone_number' => $this->phone_number,
            'status' => $this->status,
            'role' => [
                'label' => $this->role->label,
                'menu' => $this->role->menu,
                'status' => $this->role->status,
            ],
            'rentals' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'status' => $rental->status,
                'price' => $rental->price,
                'customer' => [
                    'name' => $rental->customer->name,
                    'phone_number' => $rental->customer->phone_number
                ],
                'court' => [
                    'label' => $rental->court->label,
                    'initial_price' => $rental->court->initial_price
                ],
                'created_at' => $rental->created_at->diffForHumans()
            ]))
        ];
    }

}
