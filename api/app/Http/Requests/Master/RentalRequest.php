<?php

namespace App\Http\Requests\Master;

use App\Traits\CollideCheck;
use App\Models\RentalModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;

class RentalRequest extends FormRequest
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
            'finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:start'],
            'status' => ['required', 'string', 'in:F,U'],
            'court_id' => ['required', 'integer', 'exists:tb_court,id'],
            'transaction_id' => ['nullable', 'integer', 'exists:tb_transaction,id'],
            'customer_id' => ['required', 'string', 'exists:tb_customer,customer_code'],
            'user_id' => ['required', 'string', 'exists:users,id']
        ];

        switch ($this->route()->getName()) {
            case 'create-rental':
                $validation['start'] = ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')];
                break;

            case 'update-rental':
                $validation['start'] = ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . $this->created_at];
                break;

            case 'create-multiple-rental':
                $validation = [
                    'rentals' => ['required', 'array', 'min:1', 'in:start,finish,status,court_id,transaction_id,customer_id'],
                    'rentals.*.start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')],
                    'rentals.*.finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:rentals.*.start'],
                    'rentals.*.status' => ['required', 'string', 'in:F,U'],
                    'rentals.*.court_id' => ['required', 'integer', 'exists:tb_court,id'],
                    'rentals.*.transaction_id' => ['nullable', 'integer', 'exists:tb_transaction,id'],
                    'rentals.*.customer_id' => ['required', 'string', 'exists:tb_customer,customer_code'],
                    'rentals.*.user_id' => ['required', 'string', 'exists:users,id'],
                ];
                break;
        }

        return $validation;
    }

    public function createRental()
    {
        $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));
        RentalModel::create($this->validated());
    }

    public function updateRental(RentalModel $rental)
    {
        $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));
        $rental->updateOrFail($this->validated());
    }

    public function createMultipleRental()
    {
        $data = $this->validated();
        for ($i = 0; $i < count($data); $i++) {
            $this->collideCheck($data[$i]['start'], $data[$i]['finish'], $this->getCourtSchedules($data[$i]['court_id']));
            $data[$i]['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $data[$i]['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        RentalModel::insert($data);
    }

    private function getCourtSchedules(int $court_id)
    {
        return RentalModel::select(['start', 'finish'])->where('court_id', $court_id)->get();
    }
}
