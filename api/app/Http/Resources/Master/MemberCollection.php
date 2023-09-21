<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MemberCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public static $wrap = null;

    public function toArray($request)
    {
        return $this->collection->map(function ($customer) {
            return [
                'customer_code' => $customer->customer_code,
                'name' => $customer->name,
                'phone_number' => $customer->phone_number,
                'deposit' => $customer->deposit,
                'debt' => $customer->debt,
                'status' => $customer->status,
                'member_active_period' => $customer->member_active_period,
            ];
        });
    }
}
