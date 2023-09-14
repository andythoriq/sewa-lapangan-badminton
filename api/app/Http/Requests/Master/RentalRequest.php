<?php

namespace App\Http\Requests\Master;

use App\Models\CourtModel;
use App\Models\RentalModel;
use App\Traits\CollideCheck;
use Illuminate\Support\Carbon;
use App\Models\TransactionModel;
use App\Traits\BookingCodePattern;
use App\Traits\RegularRentalsCheck;
use App\Traits\RentalPriceCalculation;
use Illuminate\Foundation\Http\FormRequest;

class RentalRequest extends FormRequest
{
    use CollideCheck, RentalPriceCalculation, RegularRentalsCheck, BookingCodePattern;
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
            // 'status' => ['required', 'string', 'in:B,O,F'],
            'court_id' => ['required', 'integer', 'exists:tb_court,id'],
            // 'transaction_id' => ['required', 'integer', 'exists:tb_transaction,id'],
            'customer_id' => ['required', 'string', 'exists:tb_customer,customer_code'],
            'user_id' => ['nullable', 'integer', 'exists:users,id']
        ];

        switch ($this->route()->getName()) {
            case 'create-rental':
                $validation['start'] = ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:now'];
                break;

            case 'update-rental':
                $validation['start'] = ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . $this->created_at];
                break;

            case 'create-multiple-rental':
                $validation = [
                    '*' => ['required', 'array', 'min:1'],
                    '*.start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:now'],
                    '*.finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:*.start'],
                    // 'rentals.*.status' => ['required', 'string', 'in:B,O,F'],
                    '*.court_id' => ['required', 'integer', 'exists:tb_court,id'],
                    // 'rentals.*.transaction_id' => ['required', 'integer', 'exists:tb_transaction,id'],
                    '*.customer_id' => ['required', 'string', 'exists:tb_customer,customer_code'],
                    '*.user_id' => ['nullable', 'integer', 'exists:users,id'],
                ];
                break;
        }

        return $validation;
    }

    public function createRental()
    {
        $this->regularRentalsCheck($this->customer_id);

        $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));

        $data = $this->validated();

        $court_initial_price = CourtModel::select('initial_price')->where('id', $this->court_id)->firstOrFail()->initial_price;

        if (strtolower($data['customer_id'][0]) == 'm') {
            $court_initial_price = ceil($court_initial_price / 1.25);
        }

        $data['price'] = $this->getCost($this->start, $this->finish, $court_initial_price);

        $data['status'] = 'B';

        $transaction = TransactionModel::create([
            'total_price' => $data['price'],
            'total_hour' => Carbon::parse($this->start)->diffInHours($this->finish),
            'booking_code' => $this->getBookingCode()
        ]);
        $data['transaction_id'] = $transaction->id;

        RentalModel::create($data);
    }

    public function updateRental(RentalModel $rental)
    {
        $this->regularRentalsCheck($this->customer_id);

        $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));

        $rental->load(['court:id,initial_price', 'customer:customer_code']);

        $data = $this->validated();
        $data['price'] = $this->getCost($this->start, $this->finish, $rental->court->initial_price);

        $rental->updateOrFail($data);
    }

    public function createMultipleRental()
    {
        $data = $this->validated();

        $transaction = TransactionModel::create([
            'total_price' => 0,
            'total_hour' => 0,
            'booking_code' => $this->getBookingCode()
        ]);

        for ($i = 0; $i < count($data); $i++) {
            $this->collideCheck($data[$i]['start'], $data[$i]['finish'], $this->getCourtSchedules($data[$i]['court_id']));

            $court_initial_price = CourtModel::select('initial_price')->where('id', $data[$i]['court_id'])->firstOrFail()->initial_price;

            if (strtolower($data[$i]['customer_id'][0] == 'm')) {
                $court_initial_price = ceil($court_initial_price / 1.25);
            }

            $data[$i]['price'] = $this->getCost($data[$i]['start'], $data[$i]['finish'], $court_initial_price);

            $transaction->total_price += $data[$i]['price'];
            $transaction->total_hour += Carbon::parse($data[$i]['start'])->diffInHours($data[$i]['finish']);

            $data[$i]['transaction_id'] = $transaction->id;
            $data[$i]['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $data[$i]['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        $transaction->saveOrFail();
        RentalModel::insert($data);
    }

    private function getCourtSchedules(int $court_id)
    {
        return RentalModel::select(['start', 'finish'])->where('court_id', $court_id)->get();
    }
}
