<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public static $wrap = 'role';

    public function toArray($request)
    {
        return [
            'label' => $this->label,
            'menu' => $this->menu,
            'status' => $this->status,
            'users' => $this->whenLoaded('users', fn() => collect($this->users)->map(fn($user) => ['id' => $user->id, 'name' => $user->name]))
        ];
    }
}
