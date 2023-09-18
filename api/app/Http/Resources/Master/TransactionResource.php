<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            'qr_code_image' => $this->qr_code_image ?? '',
            'isPaid' => $this->isPaid,
            'customer_paid' => $this->customer_paid ?? '',
            'rentals' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'status' => $rental->status,
                'price' => $rental->price
            ]))
        ];
    }
}
