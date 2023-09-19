<?php

namespace App\Http\Requests\Master;

use App\Models\OpenTimeModel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OpenTimeRequest extends FormRequest
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
        $id = isset($this->open_time) ? ($this->open_time->id ?? null) : null;
        return [
            'start' => ['required', 'date_format:H:i:s', Rule::unique('tb_open_time', 'start')->ignore($id)],
            'finish' => ['required', 'date_format:H:i:s', 'after:start', Rule::unique('tb_open_time', 'finish')->ignore($id)],
        ];
    }

    public function createOpenTime()
    {
        OpenTimeModel::create($this->validated());
    }

    public function updateOpenTime(OpenTimeModel $open_time)
    {
        $open_time->updateOrFail($this->validated());
    }
}
