<?php

namespace App\Http\Requests;

use App\Traits\ClashChecking;
use App\Models\RentalModel;
use Illuminate\Foundation\Http\FormRequest;

class PenyewaanRequest extends FormRequest
{
    use ClashChecking;
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
            'rentals' => ['required', 'array', 'min:1', 'in:start,end,status,court_id,transaction_id,pelanggan_id'],
            'rentals.*.start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')],
            'rentals.*.end' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:rentals.*.start'],
            'rentals.*.status' => ['required', 'string', 'in:F,U'],
            'rentals.*.court_id' => ['required', 'integer', 'exists:tb_court,id'],
            'rentals.*.transaction_id' => ['nullable', 'integer', 'exists:tb_transaction,id'],
            'rentals.*.customer_id' => ['required', 'string', 'exists:tb_customer,customer_code'],
        ];
    }

    public function createMultipleRental()
    {
        $data = $this->validated();
        for ($i = 0; $i < count($data); $i++) {
            $this->collideCheck($data[$i]['start'], $data[$i]['end'], $data[$i]['lapangan_id']);
            $data[$i]['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $data[$i]['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        RentalModel::insert($data);
    }
}
