<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
        return [
            'name' => $this->name,
            'email' => $this->email,
            'no_telp' => $this->no_telp,
            'status' => $this->status,
            'role' => [
                'label' => $this->role->label,
                'menu' => $this->role->menu,
                'status' => $this->role->status,
            ]
        ];
    }

}
