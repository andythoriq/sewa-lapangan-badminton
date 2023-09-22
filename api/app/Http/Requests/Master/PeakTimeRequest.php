<?php

namespace App\Http\Requests\Master;

// use App\Rules\Year2000;
use App\Models\PeakTimeModel;
use App\Traits\CollideCheck;
use Illuminate\Foundation\Http\FormRequest;

class PeakTimeRequest extends FormRequest
{
    use CollideCheck;
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
            'start' => ['required', 'date_format:H:i:s', 'after_or_equal:now'],
            'finish' => ['required', 'date_format:H:i:s', 'after:start'],
            'court_id' => ['required', 'integer', 'exists:tb_court,id'],
            'price_increase' => ['required', 'numeric', 'min:1.5'],
            'day_name' => ['required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday', 'max:20']
        ];

        if($this->route()->getName() == 'create-multiple-peak-time'){
            $validation = [
                '*' => ['required', 'array', 'min:1'],
                '*.start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:now'],
                '*.finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:*.start'],
                '*.court_id' => ['required', 'integer', 'exists:tb_court,id'],
                '*.price_increase' => ['required', 'numeric', 'min:0.01', 'max:1000000.00'],
                '*.day_name' => ['required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday', 'max:20']
            ];
        }

        return $validation;
    }

    public function createPeakTime()
    {
        $this->collideCheck($this->start, $this->finish, $this->getSchedules());
        PeakTimeModel::create($this->validated());
    }

    public function updatePeakTime(PeakTimeModel $peak_time)
    {
        $this->collideCheck($this->start, $this->finish, $this->getSchedules());
        $peak_time->updateOrFail($this->validated());
    }

    public function createMultiplePeakTime()
    {
        $data = $this->validated();
        for($i = 0; $i < count($data); $i++){
            $this->collideCheck($data[$i]['start'], $data[$i]['finish'], $this->getSchedules());
            $data[$i]['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $data[$i]['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        PeakTimeModel::insert($data);
    }

    private function getSchedules()
    {
        return PeakTimeModel::select(['start', 'finish'])->get();
    }
}
