<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerCollection extends ResourceCollection
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
            $result = [
                'code_customer' => $customer->code_customer,
                'nama' => $customer->nama,
                'deposit' => $customer->deposit,
                'debt' => $customer->debt
            ];
            if (isset($customer->member_active_period) || $customer->status == 'M' || $customer->status == 'm') {
                $result['member_active_period'] = $customer->member_active_period;
            }
            return $result;
        });
    }
}
