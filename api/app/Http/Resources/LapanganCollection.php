<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class LapanganCollection extends ResourceCollection
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
        return $this->collection->map(function($lapangan){
            return [
                'id' => $lapangan->id,
                'label' => $lapangan->label,
                'image_path' => $lapangan->image_path,
                'harga_normal' => $lapangan->harga_normal
            ];
        });
    }
}
