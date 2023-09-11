<?php

namespace App\Http\Resources\Master;

use App\Traits\ChangeRentalStatus;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RentalCollection extends ResourceCollection
{
    use ChangeRentalStatus;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = null;

    public function toArray($request)
    {
        return $this->collection->map(function($rental){
            return [
                'id' => $rental->id,
                'start' => $rental->start,
                'finish' => $rental->finish,
                'price' => $rental->price,
                'status' => $this->getAndChangeRentalStatus($rental->start, $rental->finish, $rental)
            ];
        });
    }
}
