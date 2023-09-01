<?php

namespace App\Http\Requests\Master;

// use App\Rules\Year2000;
use App\Models\PeakTimeModel;
use Illuminate\Foundation\Http\FormRequest;

class PeakTimeRequest extends FormRequest
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
            'court_id' => ['required', 'integer', 'exists:tb_court,id']
        ];
    }

    public function createPeakTime()
    {
        PeakTimeModel::create($this->validated());
    }

    public function updatePeakTime(PeakTimeModel $peak_time)
    {
        $peak_time->updateOrFail($this->validated());
    }
}
