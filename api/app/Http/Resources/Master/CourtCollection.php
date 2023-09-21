<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CourtCollection extends ResourceCollection
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
        return $this->collection->map(function($court){
            return [
                'id' => $court->id,
                'label' => $court->label,
                'image_path' => $court->image_path,
                'initial_price' => $court->initial_price,
                'description' => $court->description
            ];
        });
    }
}
