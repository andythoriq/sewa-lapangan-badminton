<?php

namespace App\Http\Requests\Master;

use App\Models\CloseTimeModel;
use App\Models\PeakTimeModel;
use App\Traits\CollideCheck;
use Illuminate\Foundation\Http\FormRequest;

class CloseTimeRequest extends FormRequest
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
            'start' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d')],
            'finish' => ['required', 'date', 'date_format:Y-m-d', 'after:start'],
            'label' => ['required', 'string', 'max:90'],
        ];
        if($this->route()->getName() == 'create-multiple-close-time'){
            $validation = [
                'close_times' => ['required', 'array', 'min:1', 'in:label,start,finish'],
                'close_times.*.label' => ['required', 'string', 'max:90'],
                'close_times.*.start' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d')],
                'close_times.*.finish' => ['required', 'date', 'date_format:Y-m-d', 'after:close_times.*.start']
            ];
        }
        return $validation;
    }

    public function createCloseTime()
    {
        $this->collideCheck($this->start, $this->finish, $this->getSchedules());
        CloseTimeModel::create($this->validated());
    }

    public function updateCloseTime(CloseTimeModel $close_time)
    {
        $this->collideCheck($this->start, $this->finish, $this->getSchedules());
        $close_time->updateOrFail($this->validated());
    }

    public function createMultipleCloseTime()
    {
        $data = $this->validated();
        for ($i = 0; $i < count($data); $i++) {
            $this->collideCheck($data[$i]['start'], $data[$i]['finish'], $this->getSchedules());
            $data[$i]['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $data[$i]['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
    }

    private function getSchedules()
    {
        return PeakTimeModel::select(['start', 'finish'])->get();
    }
}
