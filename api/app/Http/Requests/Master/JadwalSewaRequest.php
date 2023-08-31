<?php

namespace App\Http\Requests\Master;

use App\Traits\ClashChecking;
use App\Models\JadwalSewaModel;
use Illuminate\Foundation\Http\FormRequest;

class JadwalSewaRequest extends FormRequest
{
    use ClashChecking;
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
        $validation = [
            'end' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:start'],
            'status' => ['required', 'string', 'in:F,U'],
            'lapangan_id' => ['required', 'integer', 'exists:tb_lapangan,id'],
            'transaksi_id' => ['nullable', 'integer', 'exists:tb_transaksi,id'],
            'pelanggan_id' => ['required', 'string', 'exists:tb_pelanggan,code_pelanggan'],
        ];

        switch ($this->route()->getName()) {
            case 'create-jadwal-sewa':
                $validation['start'] = ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')];
                break;

            case 'update-jadwal-sewa':
                $validation['start'] = ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . $this->created_at];
                break;
        }

        return $validation;
    }

    public function createJadwalSewa()
    {
        $this->collideCheck($this->start, $this->end, $this->lapangan_id);
        JadwalSewaModel::create($this->validated());
    }

    public function updateJadwalSewa(JadwalSewaModel $jadwal)
    {
        $this->collideCheck($this->start, $this->end, $this->lapangan_id);
        $jadwal->updateOrFail($this->validated());
    }
}
