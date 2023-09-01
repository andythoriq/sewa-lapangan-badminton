<?php

namespace App\Http\Requests\Master;

use App\Models\CloseTimeModel;
use Illuminate\Foundation\Http\FormRequest;

class CloseTimeRequest extends FormRequest
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
            'start' => ['required', 'date', 'date_format:Y-m-d H:i:s'],
            'finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:start'],
            'label' => ['required', 'string', 'max:90'],
        ];
    }

    public function createCloseTime()
    {
        CloseTimeModel::create($this->validated());
    }

    public function updateCloseTime(CloseTimeModel $close_time)
    {
        $close_time->updateOrFail($this->validated());
    }
}
