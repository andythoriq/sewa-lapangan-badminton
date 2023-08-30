<?php

namespace App\Http\Requests\Master;

use App\Models\JadwalLiburModel;
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
        return [
            'label' => ['required', 'string', 'max:90'],
            'start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')],
            'end' => ['required', 'date', 'date_format:Y-m-d H:i:s']
        ];
    }

    public function createJadwalLibur()
    {
        JadwalLiburModel::create($this->validated());
    }

    public function updateJadwalLibur(JadwalLiburModel $jadwalLibur)
    {
        $jadwalLibur->updateOrFail($this->validated());
    }
}
