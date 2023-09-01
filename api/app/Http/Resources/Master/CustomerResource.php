<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            'nama' => $this->nama,
            'phone_number' => $this->phone_number,
            'deposit' => $this->deposit,
            'debt' => $this->debt,
            'status' => $this->status,
            'rental' => $this->whenLoaded('rentals', fn () => collect($this->rentals)->map(fn ($rental) => [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'status' => $rental->status
            ]))
        ];
        if (isset($this->member_active_period) || $this->status == 'M' || $this->status == 'm') {
            $result['member_active_period'] = $this->member_active_period ?? '';
        }
        return $result;
    }
}
