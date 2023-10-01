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
            'start' => ['required', 'date_format:H:i:s', 'before:finish'],
            'finish' => ['required', 'date_format:H:i:s', 'after:start'],
            'court_id' => ['required', 'integer', 'exists:tb_court,id'],
            'price_increase' => ['required', 'numeric', 'min:1000.00', 'max:1000000.00'],
            'day_name' => ['required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday']
        ];

        if($this->route()->getName() == 'create-multiple-peak-time'){
            $validation = [
                '*' => ['required', 'array', 'min:1'],
                '*.start' => ['required', 'date', 'date_format:H:i', 'after_or_equal:now'],
                '*.finish' => ['required', 'date', 'date_format:H:i', 'after:*.start'],
                '*.court_id' => ['required', 'integer', 'exists:tb_court,id'],
                '*.price_increase' => ['required', 'numeric', 'min:1000.00', 'max:1000000.00'],
                '*.day_name' => ['required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday']
            ];
        }

        return $validation;
    }

    public function createPeakTime()
    {
        $data = $this->validated();
        $data['day_name'] = strtolower($data['day_name']);
        $this->collideCheck($data['start'], $data['finish'], $this->getSchedules($data['day_name'], $data['court_id']));
        PeakTimeModel::create($data);
    }

    public function updatePeakTime(PeakTimeModel $peak_time)
    {
        $data = $this->validated();
        $data['day_name'] = strtolower($data['day_name']);
        $this->collideCheck($data['start'], $data['finish'], $this->getSchedules($data['day_name'], $data['court_id']));
        $peak_time->updateOrFail($data);
    }

    public function createMultiplePeakTime()
    {
        $data = $this->validated();
        for($i = 0; $i < count($data); $i++){
            $data[$i]['day_name'] = strtolower($data[$i]['day_name']);
            $this->collideCheck($data[$i]['start'], $data[$i]['finish'], $this->getSchedules($data[$i]['day_name'], $data[$i]['court_id']));
            $data[$i]['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $data[$i]['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        PeakTimeModel::insert($data);
    }

    private function getSchedules(string $day_name, int $court_id)
    {
        return PeakTimeModel::select(['start', 'finish'])
        ->where('day_name', $day_name)
        ->where('court_id', $court_id)
        ->get();
    }
}
