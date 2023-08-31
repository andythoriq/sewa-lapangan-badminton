<?php

namespace App\Http\Requests\Master;

use App\Models\JadwalLiburModel;
use App\Models\JadwalSibukModel;
// use App\Rules\Year200;
use Illuminate\Foundation\Http\FormRequest;

class JadwalRequest extends FormRequest
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
        $validation = [
            'start' => ['required', 'date', 'date_format:Y-m-d H:i:s'],
            'end' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:start']
        ];

        switch ($this->route()->getName()) {
            case 'jadwal-libur-create':
            case 'jadwal-libur-update':
                $validation['label'] = ['required', 'string', 'max:90'];
                break;

            case 'jadwal-sibuk-create':
            case 'jadwal-sibuk-update':
                $validation['lapangan_id'] = ['required', 'integer', 'exists:tb_lapangan,id'];
                break;
        }

        return $validation;
    }

    public function createJadwalLibur()
    {
        JadwalLiburModel::create($this->validated());
    }

    public function updateJadwalLibur(JadwalLiburModel $jadwalLibur)
    {
        $jadwalLibur->updateOrFail($this->validated());
    }

    public function createJadwalSibuk()
    {
        JadwalSibukModel::create($this->validated());
    }

    public function updateJadwalSibuk(JadwalSibukModel $jadwalSibuk)
    {
        $jadwalSibuk->updateOrFail($this->validated());
    }
}
