<?php

namespace App\Http\Resources;

use App\Traits\ChangeRentalStatus;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    use ChangeRentalStatus;
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
            'booking' => $this['booking']->map(function ($booking) {
                return [
                    'start' => $booking->start,
                    'finish' => $booking->finish,
                    'status' => $this->getAndChangeRentalStatus($booking->start, $booking->finish, $booking),
                    'price' => $booking->price,
                    'transaction' => [
                        'booking_code' => $booking->transaction->booking_code,
                        'isPaid' => $booking->transaction->isPaid
                    ],
                    'customer' => [
                        'customer_code' => $booking->customer->customer_code,
                        'name' => $booking->customer->name,
                        'phone_number' => $booking->customer->phone_number
                    ],
                    'court' => [
                        'label' => $booking->court->label,
                        'initial_price' => $booking->court->initial_price
                    ],
                    'admin' => [
                        'name' => $booking->user->name ?? '',
                        'username' => $booking->user->username ?? '',
                        'role' => $booking->user->role->label ?? ''
                    ]
                ];
            }),
            'schedule' => [
                'day_name' => $this['schedule']['day'],
                'hours' => [
                    'start' => $this['schedule']['start'],
                    'finish' => $this['schedule']['finish']
                ]
            ]
        ];
    }
}
