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
            'booking_code' => $this->booking_code,
            'customer' => $this->whenLoaded('rentals', function () {
                $firstRental = $this->rentals->first();

                if ($firstRental) {
                    return [
                        'name' => $firstRental->customer->name,
                        'phone_number' => $firstRental->customer->phone_number
                    ];
                }
                return '';
            }),
            'rentals' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'status' => $rental->status,
                'price' => $rental->price,
                'court' => [
                    'label' => $rental->court->label,
                    'initial_price' => $rental->court->initial_price
                ],
            ])),
        ];
    }
}
