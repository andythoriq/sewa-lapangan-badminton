<?php

namespace App\Http\Resources;

use App\Traits\ChangeRentalStatus;
use Illuminate\Http\Resources\Json\ResourceCollection;

class HistoryBookingCollection extends ResourceCollection
{
    use ChangeRentalStatus;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = null;
    public function toArray($request)
    {
        return $this->collection->map(function ($booking) {
            return [
                'id' => $booking->id,
                'start' => $booking->start,
                'finish' => $booking->finish,
                'price' => $booking->price,
                'status' => $this->getAndChangeRentalStatus($booking->start, $booking->finish, $booking),
                'transaction' => [
                    'total_hour' => $booking->transaction->total_hour,
                    'total_price' => $booking->transaction->total_price,
                    'booking_code' => $booking->transaction->booking_code,
                    'customer_paid' => $booking->transaction->customer_paid,
                    'customer_debt' => $booking->transaction->customer_debt
                ],
                'customer' => [
                    'name' => $booking->customer->name,
                    'phone_number' => $booking->customer->phone_number
                ],
                'court' => [
                    'label' => $booking->court->label,
                    'initial_price' => $booking->court->initial_price
                ]
            ];
        });
    }
}
