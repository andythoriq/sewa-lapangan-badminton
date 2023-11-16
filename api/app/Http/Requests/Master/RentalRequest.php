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
        $validation = [];

        switch ($this->route()->getName()) {
            case 'create-rental':
                $validation = [
                    'finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:start'],
                    'court_id' => ['required', 'exists:tb_court,id'],
                    'customer_id' => ['required', 'exists:tb_customer,customer_code'],
                    'user_id' => ['nullable', 'exists:users,id'],
                    'start' => [
                        'required',
                        'date',
                        'date_format:Y-m-d H:i:s',
                        'after_or_equal:now',
                        'bail',
                        function ($attr, $value, $fail) {
                            if (isset($this->finish)) {
                                $this->holidayOperationalCollideCheck($value, $this->finish, $fail);
                                $this->validateDuration($value, $this->finish, $fail);
                            }
                            if (isset($this->finish) && isset($this->court_id)) {
                                $this->collideCheck2($value, $this->finish, $this->getCourtSchedules($this->court_id), $fail);
                            }
                        }
                    ]
                ];
                break;

            case 'update-rental':
                $validation = [
                    'finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:start'],
                    'start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:now',
                        function ($attr, $value, $fail) {
                            if (isset($this->finish)) {
                                $this->holidayOperationalCollideCheck($value, $this->finish, $fail);
                                $this->validateDuration($value, $this->finish, $fail);
                            }
                            if (isset($this->finish) && isset($this->court_id)) {
                                $rental_id = isset($this->rental) ? ($this->rental->id ?? null) : null;
                                $this->collideCheck2($value, $this->finish, $this->getCourtSchedules($this->court_id, $rental_id), $fail);
                            }
                        }
                    ],
                ];
                break;

            case 'create-multiple-rental':
                $validation = [
                    'customer_id' => ['required', 'exists:tb_customer,customer_code'],
                    'user_id' => ['nullable', 'exists:users,id'],
                    'rentals' => ['required', 'array', 'min:1'],
                    'rentals.*.start' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:now',
                        function ($attr, $value, $fail) {
                            $finishAttr = str_replace('start', 'finish', $attr);
                            $finishValue = $this->input($finishAttr);
                            if ($finishValue) {
                                $this->holidayOperationalCollideCheck($value, $finishValue, $fail);
                                $this->validateDuration($value, $finishValue, $fail);
                                $courtIdAttr = str_replace('start', 'court_id', $attr);
                                $courtIdValue = $this->input($courtIdAttr);
                                $this->collideCheck2($value, $finishValue, $this->getCourtSchedules($courtIdValue), $fail);
                            }
                        },
                    ],
                    'rentals.*.finish' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after:rentals.*.start'],
                    'rentals.*.court_id' => ['required', 'exists:tb_court,id'],
                ];
                break;
        }

        return $validation;
    }

    public function messages()
    {
        $messages = [
            'finish.after_or_equal' => 'The start must be a date after or equal to its created date.'
        ];
       if ($this->route()->getName() === 'create-multiple-rental') {
            foreach ($this->request->get('rentals') as $key => $val) {
                $messages['rentals.' . $key . '.court_id.required'] = 'Court field is required.';
                $messages['rentals.' . $key . '.court_id.exists'] = 'Court field is invalid.';

                $messages['rentals.' . $key . '.start.required'] = 'Start field is required.';
                $messages['rentals.' . $key . '.start.date'] = 'The Start is not a valid date.';
                $messages['rentals.' . $key . '.start.date_format'] = 'The Start does not match the Y-m-d H:i:s format.';
                $messages['rentals.' . $key . '.start.after_or_equal'] = 'The Start must be a date after or equal to now.';

                $messages['rentals.' . $key . '.finish.required'] = 'Finish field is required.';
                $messages['rentals.' . $key . '.finish.date'] = 'The Finish is not a valid date.';
                $messages['rentals.' . $key . '.finish.date_format'] = 'The Finish does not match the Y-m-d H:i:s format.';
                $messages['rentals.' . $key . '.finish.after'] = 'The Finish must be a date after Start.';
            }
        }
        return $messages;
    }

    public function createRental()
    {
        // $this->validateDuration($this->start, $this->finish);
        // $this->holidayOperationalCollideCheck($this->start, $this->finish);
        // $this->collideCheck($this->start, $this->finish, $this->getCourtSchedules($this->court_id));

        $data = $this->validated();

        $validated_price = $this->getPeakTimePrice($this->court_id, Carbon::parse($this->start, 'Asia/Jakarta')->dayName);

        $data['price'] = $this->getCost($this->start, $this->finish, $validated_price);

        $data['hour'] = Carbon::parse($this->start, 'Asia/Jakarta')->floatDiffInHours($this->finish);

        $data['status'] = 'B';

        $booking_code = $this->getBookingCode();

        $qr_code = $this->createQrCode($booking_code);

        $transaction = TransactionModel::create([
            'total_price' => $data['price'],
            'total_hour' => $data['hour'],
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
        $price_before = (float) $rental->price;
        $hour_before = (float) $rental->hour;

        $data = $this->validated();

        $validated_price = $this->getPeakTimePrice($rental->court_id, Carbon::parse($this->start, 'Asia/Jakarta')->dayName);
        $data['price'] = $this->getCost($this->start, $this->finish, $validated_price);
        $data['hour'] = Carbon::parse($this->start, 'Asia/Jakarta')->floatDiffInHours($this->finish);

        $trx = TransactionModel::whereHas('rentals', function($query) use ($rental) {
            $query->where('id', $rental->id);
        })->first();

        $trx->update([
            'total_price' => (float) $trx->total_price - $price_before + (float) $data['price'],
            'total_hour' => (float) $trx->total_hour - $hour_before + (float) $data['hour'],
        ]);

        $rental->updateOrFail($data);
    }

    public function createMultipleRental()
    {
        $this->regularRentalsCheck($this->customer_id);

        $data = $this->validated();

        $this->createMultipleCollideCheck($data['rentals']);

        $booking_code = $this->getBookingCode();
        $qr_code = $this->createQrCode($booking_code);

        $transaction = TransactionModel::create([
            'total_price' => 0,
            'total_hour' => 0,
            'booking_code' => $booking_code,
            'qr_code_image' => $qr_code,
        ]);

        $discount = ConfigModel::getMemberDiscount();

        foreach ($data['rentals'] as &$rental) {

            // $this->validateDuration($rental['start'], $rental['finish']);
            // $this->holidayOperationalCollideCheck($rental['start'], $rental['finish']);
            // $this->collideCheck($rental['start'], $rental['finish'], $this->getCourtSchedules($rental['court_id']));

            $validated_price = $this->getPeakTimePrice($rental['court_id'], Carbon::parse($rental['start'], 'Asia/Jakarta')->dayName);
            $discounted = $validated_price - (($discount / 100) * $validated_price);

            $rental['price'] = $this->getCost($rental['start'], $rental['finish'], $discounted);
            $rental['hour'] = Carbon::parse($rental['start'], 'Asia/Jakarta')->floatDiffInHours($rental['finish']);

            $transaction->total_price += $rental['price'];
            $transaction->total_hour += $rental['hour'];

            $rental['transaction_id'] = $transaction->id;
            $rental['customer_id'] = $this->customer_id;
            $rental['user_id'] = $this->user_id;
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

    private function getCourtSchedules(?int $court_id, $rental_id = null)
    {
        if ($rental_id) {
            return RentalModel::select(['start', 'finish'])->where('court_id', $court_id)->where('id', '!=', $rental_id)->whereNotIn('status', ['C', 'F'])->get();
        }
        return RentalModel::select(['start', 'finish'])->where('court_id', $court_id)->whereNotIn('status', ['C', 'F'])->get();
    }
}
