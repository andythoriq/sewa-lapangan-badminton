<?php

namespace App\Http\Requests\Master;

use App\Models\CloseDateModel;
// use App\Rules\Year2000;
use App\Models\PeakTimeModel;
use Illuminate\Foundation\Http\FormRequest;

class ScheduleRequest extends FormRequest
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
            'finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:start']
        ];

        switch ($this->route()->getName()) {
            case 'close-date-create':
            case 'close-date-update':
                $validation['label'] = ['required', 'string', 'max:90'];
                break;

            case 'peak-time-create':
            case 'peak-time-update':
                $validation['court_id'] = ['required', 'integer', 'exists:tb_court,id'];
                break;
        }

        return $validation;
    }

    public function createCloseDate()
    {
        CloseDateModel::create($this->validated());
    }

    public function updateCloseDate(CloseDateModel $close_date)
    {
        $close_date->updateOrFail($this->validated());
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
