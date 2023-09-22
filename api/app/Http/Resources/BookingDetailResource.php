<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookingDetailResource extends JsonResource
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
            'total_price' => $this->total_price,
            'total_hour' => $this->total_hour,
            'isPaid' => $this->isPaid,
            'customer_paid' => $this->customer_paid ?? '',
            'isDebt' => $this->isDebt,
            'customer_debt' => $this->customer_debt ?? '',
            'rentals' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'status' => $rental->status,
                'price' => $rental->price,
                'court' => [
                    'label' => $rental->court->label
                ],
                'admin' => [
                    'name' => $rental->user->name,
                    'username' => $rental->user->username
                ],
                'customer' => [
                    'name' => $rental->customer->name,
                    'phone_number' => $rental->customer->phone_number
                ]
            ])),
        ];
    }
}
