<?php

namespace App\Http\Resources\Master;

// use App\Traits\ChangeRentalStatus;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RentalCollection extends ResourceCollection
{
    // use ChangeRentalStatus;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = null;

    public function toArray($request)
    {
        return $this->collection->map(function($rental){
            return [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'price' => $rental->price,
                'status' => $rental->status,
                'transaction' => [
                    // 'id' => $rental->transaction->id,
                    'total_hour' => $rental->transaction->total_hour,
                    'total_price' => $rental->transaction->total_price
                ],
                'customer' => [
                    // 'customer_code' => $rental->customer->customer_code,
                    'name' => $rental->customer->name,
                    'phone_number' => $rental->customer->phone_number
                ],
                'court' => [
                    // 'id' => $rental->court->id,
                    'label' => $rental->court->label,
                    'initial_price' => $rental->court->initial_price
                ]
            ];
        });
    }
}
