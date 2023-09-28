<?php

namespace App\Http\Requests\Master;

use App\Models\CourtModel;
use App\Models\CustomerModel;
use App\Models\RentalModel;
use App\Traits\CollideCheck;
use App\Traits\CreateQrCode;
use Illuminate\Support\Carbon;
use App\Models\TransactionModel;
use App\Traits\BookingCodePattern;
use App\Traits\RentalDurationRule;
use App\Traits\RegularRentalsCheck;
use App\Traits\RentalPriceCalculation;
use Illuminate\Foundation\Http\FormRequest;

class RentalRequest extends FormRequest
{
    use CollideCheck, RentalPriceCalculation, RegularRentalsCheck, BookingCodePattern, RentalDurationRule, CreateQrCode;
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
            'finish' => ['required', 'date', 'date_format:Y-m-d\TH:i', 'after:start'],
            // 'status' => ['required', 'string', 'in:B,O,F'],
            'court_id' => ['required', 'integer', 'exists:tb_court,id'],
            // 'transaction_id' => ['required', 'integer', 'exists:tb_transaction,id'],
            'customer_id' => ['required', 'string', 'exists:tb_customer,customer_code'],
            'user_id' => ['nullable', 'integer', 'exists:users,id']
        ];

        switch ($this->route()->getName()) {
            case 'create-rental':
                $validation['start'] = ['required', 'date', 'date_format:Y-m-d\TH:i', 'after_or_equal:now'];
                break;

            case 'update-rental':
                $validation['start'] = ['required', 'date', 'date_format:Y-m-d\TH:i', 'after_or_equal:' . $this->created_at];
                break;

            case 'create-multiple-rental':
                $validation = [
                    'customer_id' => ['required', 'string', 'exists:tb_customer,customer_code'],
                    'user_id' => ['nullable', 'integer', 'exists:users,id'],
                    'rentals' => ['required', 'array', 'min:1'],
                    'rentals.*.start' => ['required', 'date', 'date_format:Y-m-d\TH:i', 'after_or_equal:now'],
                    'rentals.*.finish' => ['required', 'date', 'date_format:Y-m-d\TH:i', 'after:rentals.*.start'],
                    // 'rentals.*.status' => ['required', 'string', 'in:B,O,F'],
                    'rentals.*.court_id' => ['required', 'integer', 'exists:tb_court,id'],
                    // 'rentals.*.transaction_id' => ['required', 'integer', 'exists:tb_transaction,id'],
                ];
                break;
        }

        return $validation;
    }

    public function createRental()
    {
        $this->regularRentalsCheck($this->customer_id);

        $this->validateDuration($this->start, $this->finish);

        $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));

        $data = $this->validated();

        $court_initial_price = CourtModel::select('initial_price')->where('id', $this->court_id)->firstOrFail()->initial_price;

        if (strtolower($data['customer_id'][0]) == 'm') {
            $court_initial_price = ceil($court_initial_price / 1.25);
        }

        $data['price'] = $this->getCost($this->start, $this->finish, $court_initial_price);

        $data['status'] = 'B';

        $booking_code = $this->getBookingCode();

        $qr_code = $this->createQrCode($booking_code, env('FRONTEND_URL'));

        $transaction = TransactionModel::create([
            'total_price' => $data['price'],
            'total_hour' => Carbon::parse($this->start)->diffInHours($this->finish),
            'booking_code' => $booking_code,
            'qr_code_image' => $qr_code
        ]);
        $data['transaction_id'] = $transaction->id;

        RentalModel::create($data);

        $customer_phone_number = CustomerModel::select('phone_number')->where('customer_code', $this->customer_id)->firstOrFail()->phone_number;

        return [
            'bc' => $transaction->booking_code,
            'tp' => $transaction->total_price,
            'th' => $transaction->total_hour,
            'pn' => $customer_phone_number
        ];
    }

    public function updateRental(RentalModel $rental)
    {
        $this->regularRentalsCheck($this->customer_id);

        $this->validateDuration($this->start, $this->finish);

        $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));

        $rental->load(['court:id,initial_price', 'customer:customer_code']);

        $data = $this->validated();
        $data['price'] = $this->getCost($this->start, $this->finish, $rental->court->initial_price);

        $rental->updateOrFail($data);
    }

    public function createMultipleRental()
    {
        $data = $this->validated();

        if (strtolower($data['customer_id'][0]) == 'r') {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'customer_id' => ['Regular can\'t make multiple rentals.']
            ]);
        }

        $booking_code = $this->getBookingCode();
        $qr_code = $this->createQrCode($booking_code, env('FRONTEND_URL'));

        $transaction = TransactionModel::create([
            'total_price' => 0,
            'total_hour' => 0,
            'booking_code' => $booking_code,
            'qr_code_image' => $qr_code,
        ]);

        foreach ($data['rentals'] as &$rental) {
            $this->collideCheck($rental['start'], $rental['finish'], $this->getCourtSchedules($rental['court_id']));

            $this->validateDuration($rental['start'], $rental['finish']);

            $court_initial_price = CourtModel::select('initial_price')->where('id', $rental['court_id'])->firstOrFail()->initial_price;

            $ceiled = ceil($court_initial_price / 1.25);

            $rental['price'] = $this->getCost($rental['start'], $rental['finish'], $ceiled);

            $transaction->total_price += $rental['price'];
            $transaction->total_hour += Carbon::parse($rental['start'])->diffInHours($rental['finish']);

            $rental['transaction_id'] = $transaction->id;
            $rental['customer_id'] = $this->customer_id;
            $rental['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $rental['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        $transaction->saveOrFail();
        RentalModel::insert($data['rentals']);

        $customer_phone_number = CustomerModel::select('phone_number')->where('customer_code', $this->customer_id)->firstOrFail()->phone_number;

        return [
            'bc' => $transaction->booking_code,
            'tp' => $transaction->total_price,
            'th' => $transaction->total_hour,
            'pn' => $customer_phone_number
        ];
    }

    private function getCourtSchedules(int $court_id)
    {
        return RentalModel::select(['start', 'finish'])->where('court_id', $court_id)->get();
    }
}
