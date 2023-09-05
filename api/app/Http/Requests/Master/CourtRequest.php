<?php

namespace App\Http\Requests\Master;

use App\Models\CourtModel;
use Illuminate\Foundation\Http\FormRequest;

class CourtRequest extends FormRequest
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
            'description' => ['required', 'max:120'],
            'normal_price' => ['required', 'numeric', 'min:0.01', 'max:1000000.00']
        ];
    }

    public function createCourt()
    {
        $court = new CourtModel();
        $court->fill($this->validated());
        $this->saveCourt($court);
    }

    public function updateCourt(CourtModel $court)
    {
        $court->fill($this->validated());
        $this->saveCourt($court);
    }

    private function saveCourt(CourtModel $court)
    {
        if ($this->hasFile('image_path')) {
            $this->file('image_path')->move('court-image/', $this->file('image_path')->getClientOriginalName());
            $court->image_path = $this->file('image_path')->getClientOriginalName();
        } else {
            $court->image_path = 'court-image2/no_image.png';
        }
        $court->saveOrFail();
    }
}
