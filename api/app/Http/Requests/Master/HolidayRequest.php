<?php

namespace App\Http\Requests\Master;

use App\Models\HolidayModel;
use App\Traits\CollideCheck;
use Illuminate\Foundation\Http\FormRequest;

class HolidayRequest extends FormRequest
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
        if($this->route()->getName() == 'create-multiple-holiday'){
            $validation = [
                'holidays' => ['required', 'array', 'min:1', 'in:label,start,finish'],
                'holidays.*.label' => ['required', 'string', 'max:90'],
                'holidays.*.start' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d')],
                'holidays.*.finish' => ['required', 'date', 'date_format:Y-m-d', 'after:holidays.*.start']
            ];
        }
        return $validation;
    }

    public function createHoliday()
    {
        $this->collideCheck($this->start, $this->finish, $this->getSchedules());
        HolidayModel::create($this->validated());
    }

    public function updateHoliday(HolidayModel $holiday)
    {
        $this->collideCheck($this->start, $this->finish, $this->getSchedules());
        $holiday->updateOrFail($this->validated());
    }

    public function createMultipleHoliday()
    {
        $data = $this->validated();
        for ($i = 0; $i < count($data); $i++) {
            $this->collideCheck($data[$i]['start'], $data[$i]['finish'], $this->getSchedules());
            $data[$i]['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $data[$i]['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        HolidayModel::insert($data);
    }

    private function getSchedules()
    {
        return HolidayModel::select(['start', 'finish'])->get();
    }
}
