<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PelangganCollection extends ResourceCollection
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
        return $this->collection->map(function ($pelanggan) {
            $result = [
                'code_pelanggan' => $pelanggan->code_pelanggan,
                'nama' => $pelanggan->nama,
                'deposit' => $pelanggan->deposit,
                'hutang' => $pelanggan->hutang
            ];
            if (isset($pelanggan->masa_aktif_member)) {
                $result['masa_aktif_member'] = $pelanggan->masa_aktif_member;
            }
            return $result;
        });
    }
}