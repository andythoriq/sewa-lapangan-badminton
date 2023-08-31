<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Resources\Json\JsonResource;

class JadwalSewaResource extends JsonResource
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
        $result = [
            'start' => $this->start,
            'end' => $this->end,
            'status' => $this->status,
            'lapangan' => [
                'label' => $this->lapangan->label,
                'image_path' => $this->lapangan->image_path,
                'deskripsi' => $this->lapangan->deskripsi,
                'harga_normal' => $this->lapangan->harga_normal
            ],
            'transaksi' => [
                'total_harga' => $this->transaksi->total_harga,
                'total_jam' => $this->transaksi->total_jam,
            ],
            'pelanggan' => [
                'nama' => $this->pelanggan->nama,
                'no_telp' => $this->pelanggan->no_telp,
                'deposit' => $this->pelanggan->deposit,
                'hutang' => $this->pelanggan->hutang,
                'status' => $this->pelanggan->status,
            ],
        ];

        if(isset($this->pelanggan->masa_aktif_member) || $this->pelanggan->status == 'm' || $this->pelanggan->status == 'M'){
            $result['pelanggan']['masa_aktif_member'] = $this->pelanggan->masa_aktif_member ?? '';
        }

        return $result;
    }
}
