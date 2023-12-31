<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
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
            'membership_status' => $this->membership_status,
            'member_active_period' => $this->member_active_period,
            'rentals' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'status' => $rental->status,
                'price' => $rental->price,
                'court' =>  $rental->court->label,
                'booking_code' => $rental->transaction->booking_code,
                'created_at' => $rental->created_at->diffForHumans()
            ]))
        ];
    }
}
