<?php

namespace App\Http\Requests\Master;

use App\Models\ConfigModel;
use App\Models\CustomerModel;
use App\Models\NotificationModel;
use App\Models\RentalModel;
use App\Traits\CollideCheck;
use App\Traits\CreateQrCode;
use App\Traits\PeakTimeCheck;
use App\Traits\StartFinishBookingCheck;
use Illuminate\Support\Carbon;
use App\Models\TransactionModel;
use App\Traits\BookingCodePattern;
use App\Traits\RentalDurationRule;
use App\Traits\RegularRentalsCheck;
use App\Traits\RentalPriceCalculation;
use Illuminate\Foundation\Http\FormRequest;

class RentalRequest extends FormRequest
{
    use CollideCheck, RentalPriceCalculation, RegularRentalsCheck, BookingCodePattern, RentalDurationRule, CreateQrCode, PeakTimeCheck, StartFinishBookingCheck;
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
            'court_id' => ['required', 'exists:tb_court,id'],
            // 'transaction_id' => ['required', 'integer', 'exists:tb_transaction,id'],
            'customer_id' => ['required', 'exists:tb_customer,customer_code'],
            'user_id' => ['nullable', 'exists:users,id']
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
                    'customer_id' => ['required', 'exists:tb_customer,customer_code'],
                    'user_id' => ['nullable', 'exists:users,id'],
                    'rentals' => ['required', 'array', 'min:1'],
                    'rentals.*.start' => ['required', 'date', 'date_format:Y-m-d\TH:i', 'after_or_equal:now'],
                    'rentals.*.finish' => ['required', 'date', 'date_format:Y-m-d\TH:i', 'after:rentals.*.start'],
                    // 'rentals.*.status' => ['required', 'string', 'in:B,O,F'],
                    'rentals.*.court_id' => ['required', 'exists:tb_court,id'],
                    // 'rentals.*.transaction_id' => ['required', 'integer', 'exists:tb_transaction,id'],
                ];
                break;
        }

        return $validation;
    }

    public function messages()
    {
        $messages = [];
       if ($this->route()->getName() === 'create-multiple-rental') {
            foreach ($this->request->get('rentals') as $key => $val) {
                $messages['rentals.' . $key . '.court_id.required'] = 'Court field is required.';
                $messages['rentals.' . $key . '.court_id.exists'] = 'Court field is invalid.';

                $messages['rentals.' . $key . '.start.required'] = 'Start field is required.';
                $messages['rentals.' . $key . '.start.date'] = 'The Start is not a valid date.';
                $messages['rentals.' . $key . '.start.date_format'] = 'The Start does not match the Y-m-d\TH:i format.';
                $messages['rentals.' . $key . '.start.after_or_equal'] = 'The Start must be a date after or equal to now.';

                $messages['rentals.' . $key . '.finish.required'] = 'Finish field is required.';
                $messages['rentals.' . $key . '.finish.date'] = 'The Finish is not a valid date.';
                $messages['rentals.' . $key . '.finish.date_format'] = 'The Finish does not match the Y-m-d\TH:i format.';
                $messages['rentals.' . $key . '.finish.after'] = 'The Finish must be a date after Start.';
            }
        }
        return $messages;
    }

    public function createRental()
    {
        $this->validateDuration($this->start, $this->finish);
        $this->startFinishCheck($this->start, $this->finish);
        $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));

        $data = $this->validated();

        $validated_price = $this->getPeakTimePrice($this->court_id, Carbon::now('Asia/Jakarta')->dayName);

        $data['price'] = $this->getCost($this->start, $this->finish, $validated_price);

        $data['status'] = 'B';

        $booking_code = $this->getBookingCode();

        $qr_code = $this->createQrCode($booking_code, env('FRONTEND_URL', 'http://localhost:3000'));

        $transaction = TransactionModel::create([
            'total_price' => $data['price'],
            'total_hour' => Carbon::parse($this->start, 'Asia/Jakarta')->floatDiffInHours($this->finish),
            'booking_code' => $booking_code,
            'qr_code_image' => $qr_code
        ]);
        $data['transaction_id'] = $transaction->id;

        RentalModel::create($data);

        $customer = CustomerModel::select(['phone_number', 'name'])->where('customer_code', $this->customer_id)->first();

        NotificationModel::notifyRegularBooking($customer->name, $this->start, $this->finish, $transaction->total_hour, $transaction->total_price);

        return [
            'bc' => $transaction->booking_code,
            'tp' => $transaction->total_price,
            'th' => $transaction->total_hour,
            'qr' => $transaction->qr_code_image,
            'pn' => $customer->phone_number
        ];
    }

    public function updateRental(RentalModel $rental)
    {
        // $this->regularRentalsCheck($this->customer_id);

        $this->validateDuration($this->start, $this->finish);

        $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));

        $rental->load(['court:id,initial_price', 'customer:customer_code']);

        $data = $this->validated();
        $data['price'] = $this->getCost($this->start, $this->finish, $rental->court->initial_price);

        $rental->updateOrFail($data);
    }

    public function createMultipleRental()
    {
        $this->regularRentalsCheck($this->customer_id);

        $data = $this->validated();

        $booking_code = $this->getBookingCode();
        $qr_code = $this->createQrCode($booking_code, env('FRONTEND_URL', 'http://localhost:3000'));

        $transaction = TransactionModel::create([
            'total_price' => 0,
            'total_hour' => 0,
            'booking_code' => $booking_code,
            'qr_code_image' => $qr_code,
        ]);

        foreach ($data['rentals'] as &$rental) {

            $this->validateDuration($rental['start'], $rental['finish']);
            $this->startFinishCheck($rental['start'], $rental['finish']);
            $this->collideCheck($rental['start'], $rental['finish'], $this->getCourtSchedules($rental['court_id']));

            $validated_price = $this->getPeakTimePrice($rental['court_id'], Carbon::now('Asia/Jakarta')->dayName);
            $discount = ConfigModel::getMemberDiscount();
            $discounted = $validated_price - (($discount / 100) * $validated_price);

            $rental['price'] = $this->getCost($rental['start'], $rental['finish'], $discounted);

            $transaction->total_price += $rental['price'];
            $transaction->total_hour += Carbon::parse($rental['start'], 'Asia/Jakarta')->floatDiffInHours($rental['finish']);

            $rental['transaction_id'] = $transaction->id;
            $rental['customer_id'] = $this->customer_id;
            $rental['created_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
            $rental['updated_at'] = now('Asia/Jakarta')->format('Y-m-d H:i:s');
        }
        $transaction->saveOrFail();
        RentalModel::insert($data['rentals']);

        $customer = CustomerModel::select(['phone_number', 'name'])->where('customer_code', $this->customer_id)->first();

        NotificationModel::notifyMemberBooking($customer->name, $transaction->total_hour, $transaction->total_price, count($data['rentals']));

        return [
            'bc' => $transaction->booking_code,
            'tp' => $transaction->total_price,
            'th' => $transaction->total_hour,
            'qr' => $transaction->qr_code_image,
            'pn' => $customer->phone_number
        ];
    }

    private function getCourtSchedules(int $court_id)
    {
        return RentalModel::select(['start', 'finish'])->where('court_id', $court_id)->where('status', '!=', 'C')->get();
    }
}
