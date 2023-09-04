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
                'code_customer' => $customer->code_customer,
                'name' => $customer->name,
                'deposit' => $customer->deposit,
                'debt' => $customer->debt,
                'member_active_period' => $customer->member_active_period,
            ];
        });
    }
}
