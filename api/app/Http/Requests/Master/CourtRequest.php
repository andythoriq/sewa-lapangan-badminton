<?php

namespace App\Http\Requests\Master;

use App\Models\CourtModel;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
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
        $id = isset($this->court) ? ($this->court->id ?? null) : null;
        return [
            'label' => ['required', 'string', 'min:3', 'max:60', Rule::unique('tb_court', 'label')->ignore($id)],
            // 'image_path' => ['required', 'string', 'max:255'],
            // 'image_path' => ['required', 'image', 'max:5000', 'mimes:png,jpg,jpeg'],
            'image_path' => ['nullable', 'image', 'max:5000', 'mimes:png,jpg,jpeg'],
            'description' => ['required', 'max:254'],
            'initial_price' => ['required', 'numeric', 'min:0.01', 'max:1000000.00'],
            'old_image' => ['nullable'],
        ];
    }

    public function createCourt()
    {
        $court = new CourtModel($this->except('old_image'));
        $this->saveCourt($court);
    }

    public function updateCourt(CourtModel $court)
    {
        $court->fill($this->except('old_image'));
        $this->saveCourt($court);
    }

    private function saveCourt(CourtModel $court)
    {
        if ($this->hasFile('image_path')) {
            // $this->file('image_path')->move('court-image/', $this->file('image_path')->getClientOriginalName());
            // $court->image_path = $this->file('image_path')->getClientOriginalName();

            if (isset($this->old_image)) {
                Storage::delete($this->old_image);
            }
            $court->image_path = $this->file('image_path')->store('court-images');
        } else if (!$this->hasFile('image_path') && isset($this->old_image)) {
            $court->image_path = $this->old_image;
        }
        $court->saveOrFail();
    }
}
