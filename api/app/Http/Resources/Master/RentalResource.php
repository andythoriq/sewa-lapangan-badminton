<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class RentalResource extends JsonResource
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
            'status' => $this->status,
            'court' => [
                'label' => $this->court->label,
                'image_path' => $this->court->image_path,
                'description' => $this->court->description,
                'normal_price' => $this->court->normal_price
            ],
            'transaction' => [
                'total_price' => $this->transaction->total_price ?? '',
                'total_hour' => $this->transaction->total_hour ?? '',
            ],
            'customer' => [
                'name' => $this->customer->name,
                'phone_number' => $this->customer->phone_number,
                'deposit' => $this->customer->deposit,
                'debt' => $this->customer->debt,
                'status' => $this->customer->status,
                'member_active_period' => $this->customer->member_active_period ?? '',
                'member_booking_code' => $this->customer->member_booking_code ?? ''
            ],
            'admin' => [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'phone_number' => $this->user->phone_number,
                'status' => $this->user->status,
                'role' => [
                    'label' => $this->user->role->label,
                    'menu' => $this->user->role->menu,
                    'status' => $this->user->role->status
                ]
            ],
        ];
    }
}
