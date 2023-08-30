<?php

namespace App\Http\Requests\Master;

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
            // 'image_path' => ['required', 'string', 'max:255'],
            // 'image_path' => ['required', 'image', 'max:5000', 'mimes:png,jpg,jpeg'],
            'image_path' => ['nullable', 'image', 'max:5000', 'mimes:png,jpg,jpeg'],
            'deskripsi' => ['required', 'max:191'],
            'harga_normal' => ['required', 'numeric', 'min:0.01', 'max:1000000.00']
        ];
    }

    public function createLapangan()
    {
        $lapangan = new LapanganModel();
        $lapangan->fill($this->validated());
        $this->saveLapangan($lapangan);
    }

    public function updateLapangan(LapanganModel $lapangan)
    {
        $lapangan->fill($this->validated());
        $this->saveLapangan($lapangan);
    }

    private function saveLapangan(LapanganModel $lapangan)
    {
        if ($this->hasFile('image_path')) {
            $this->file('image_path')->move('lapangan-image/', $this->file('image_path')->getClientOriginalName());
            $lapangan->image_path = $this->file('image_path')->getClientOriginalName();
        } else {
            $lapangan->image_path = 'lapangan-image2/no_image.png';
        }
        $lapangan->saveOrFail();
    }
}
