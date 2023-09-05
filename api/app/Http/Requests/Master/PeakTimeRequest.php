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
            'start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')],
            'finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:start'],
            'court_id' => ['required', 'integer', 'exists:tb_court,id']
        ];

        if($this->route()->getName() == 'create-multiple-peak-time'){
            $validation = [
                'peak_times' => ['required', 'array', 'min:1', 'in:start,finish,court_id'],
                'peak_times.*.start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')],
                'peak_times.*.finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:peak_times.*.start'],
                'peak_times.*.court_id' => ['required', 'integer', 'exists:tb_court,id']
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
