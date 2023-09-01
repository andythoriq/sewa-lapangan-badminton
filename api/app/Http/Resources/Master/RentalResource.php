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
        $result = [
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
                'nama' => $this->customer->nama,
                'phone_number' => $this->customer->phone_number,
                'deposit' => $this->customer->deposit,
                'debt' => $this->customer->debt,
                'status' => $this->customer->status,
            ],
        ];

        if(isset($this->customer->member_active_period) || $this->customer->status == 'm' || $this->customer->status == 'M'){
            $result['customer']['member_active_period'] = $this->customer->member_active_period ?? '';
        }

        return $result;
    }
}
