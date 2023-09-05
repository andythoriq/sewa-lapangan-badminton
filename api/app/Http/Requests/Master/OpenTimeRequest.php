<?php

namespace App\Http\Requests\Master;

use App\Models\OpenTimeModel;
use App\Traits\CollideCheck;
use Illuminate\Foundation\Http\FormRequest;

class OpenTimeRequest extends FormRequest
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
        return [
            'start' => ['required', 'date_format:H:i:s'],
            'finish' => ['required', 'date_format:H:i:s', 'after:start'],
        ];
    }

    public function createOpenTime()
    {
        $this->collideCheck($this->start, $this->finish, $this->getSchedules());
        OpenTimeModel::create($this->validated());
    }

    public function updateOpenTime(OpenTimeModel $open_time)
    {
        $this->collideCheck($this->start, $this->finish, $this->getSchedules());
        $open_time->updateOrFail($this->validated());
    }

    public function createMultipleOpenTime()
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
        return OpenTimeModel::select(['start', 'finish'])->get();
    }
}
