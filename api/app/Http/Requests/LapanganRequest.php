<?php

namespace App\Http\Requests;

use App\Models\LapanganModel;
use Illuminate\Foundation\Http\FormRequest;

class LapanganRequest extends FormRequest
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
            'image_path' => ['required', 'string', 'max:255'],
            'deskripsi' => ['required', 'max:191'],
            'harga_normal' => ['required', 'numeric', 'min:0.01', 'max:1000000.00']
        ];
    }

    public function createLapangan()
    {
        LapanganModel::create($this->validated());
    }

    public function updateLapangan(LapanganModel $lapangan)
    {
        $lapangan->updateOrFail($this->validated());
    }
}
