<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TransactionCollection extends ResourceCollection
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
        return $this->collection->map(function($transaction){
            return [
                'id' => $transaction->id,
                'total_price' => $transaction->total_price,
                'total_hour' => $transaction->total_hour,
                'booking_code' => $transaction->booking_code
            ];
        });
    }
}
