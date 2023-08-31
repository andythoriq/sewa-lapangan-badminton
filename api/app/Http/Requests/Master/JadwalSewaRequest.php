<?php

namespace App\Http\Requests\Master;

use App\Models\JadwalSewaModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Http\FormRequest;

class JadwalSewaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validation = [];

        switch ($this->route()->getName()) {
            case 'create-jadwal-sewa':
                $validation = [
                    'rentals' => ['required', 'array', 'min:1', 'in:start,end,status,lapangan_id,transaksi_id,pelanggan_id'],
                    'rentals.*.start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')],
                    'rentals.*.end' => ['required', 'date', 'date_format:Y-m-d H:i:s'],
                    'rentals.*.status' => ['required', 'string', 'in:F,U'],
                    'rentals.*.lapangan_id' => ['required', 'integer', 'exists:tb_lapangan,id'],
                    'rentals.*.transaksi_id' => ['nullable', 'integer', 'exists:tb_transaksi,id'],
                    'rentals.*.pelanggan_id' => ['required', 'string', 'exists:tb_pelanggan,code_pelanggan'],
                ];
                break;

           case 'update-jadwal-sewa':
                $validation = [
                    'start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . $this->created_at],
                    'end' => ['required', 'date', 'date_format:Y-m-d H:i:s'],
                    'status' => ['required', 'string', 'in:F,U'],
                    'lapangan_id' => ['required', 'integer', 'exists:tb_lapangan,id'],
                    'transaksi_id' => ['nullable', 'integer', 'exists:tb_transaksi,id'],
                    'pelanggan_id' => ['required', 'string', 'exists:tb_pelanggan,code_pelanggan'],
                ];
                break;
        }

        return $validation;
    }

    public function createJadwalSewa()
    {
        $data = $this->validated();
        for ($i = 0; $i < count($data); $i++) {
            $data[$i]['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $data[$i]['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        JadwalSewaModel::insert($data);
    }

    public function updateJadwalSewa(JadwalSewaModel $jadwal)
    {
        $jadwal->updateOrFail($this->validated());
    }
}
