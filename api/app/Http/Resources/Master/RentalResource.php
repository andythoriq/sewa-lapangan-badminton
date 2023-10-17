<?php

namespace App\Http\Resources\Master;

// use App\Traits\ChangeRentalStatus;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class RentalResource extends JsonResource
{
    // use ChangeRentalStatus;
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
            'start' => date('H:i', strtotime($this->start)),
            'finish' => date('H:i', strtotime($this->finish)),
            'status' => $this->status,
            'price' => $this->price,
            'created_at'=> $this->created_at->diffForHumans(),
            'duration_hour' => Carbon::parse($this->start, 'Asia/Jakarta')->floatDiffInHours($this->finish),
            'duration_minute' => Carbon::parse($this->start, 'Asia/Jakarta')->diffInMinutes($this->finish),
            'court' => [
                'label' => $this->court->label,
                'image_path' => $this->court->image_path,
                'description' => $this->court->description,
                'initial_price' => $this->court->initial_price
            ],
            'transaction' => [
                'total_price' => $this->transaction->total_price,
                'total_hour' => $this->transaction->total_hour,
                'booking_code' => $this->transaction->booking_code,
                'customer_paid' => $this->transaction->customer_paid ?? 0,
                'customer_debt' => $this->transaction->customer_debt ?? 0,
                'customer_deposit' => $this->transaction->customer_deposit ?? 0,
                'isPaymentDone' => ($this->transaction->isPaid === 'Y' || $this->transaction->isDebt === 'Y' || $this->transaction->isDeposit === 'Y')
            ],
            'customer' => [
                'name' => $this->customer->name,
                'phone_number' => $this->customer->phone_number,
                'deposit' => $this->customer->deposit,
                'debt' => $this->customer->debt,
                'status' => $this->customer->status,
                'membership_status' => $this->customer->membership_status,
                'member_active_period' => $this->customer->member_active_period ?? '',
            ],
            'admin' => [
                'name' => $this->user->name ?? 'self',
                'phone_number' => $this->user->phone_number ?? '',
                'username' => $this->user->username ?? '',
                'status' => $this->user->status ?? '',
                'role' => [
                    'label' => $this->user->role->label ?? '',
                    'menu' => $this->user->role->menu ?? '',
                    'status' => $this->user->role->status ?? ''
                ]
            ],
        ];
    }
}
