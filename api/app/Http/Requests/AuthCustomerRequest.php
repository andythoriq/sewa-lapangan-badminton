<?php

namespace App\Http\Requests;

use App\Models\OTPModel;
use App\Traits\SendWA;
use App\Models\CustomerModel;
use Illuminate\Support\Carbon;
// use Illuminate\Validation\Rule;
use App\Traits\CustomerCodeFormat;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class AuthCustomerRequest extends FormRequest
{
    use CustomerCodeFormat, SendWA;
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
        $rules = [];
        switch ($this->route()->getName()) {
            case 'verify-otp':
                $rules = [
                    // 'phone_number' => ['required', 'string', 'max:20'],
                    'otp_code' => ['required', 'digits:6', 'exists:tb_customer,otp_code']
                ];
                break;
            case 'send-otp':
                $rules = [
                    'name' => ['nullable', 'regex:/^[A-Za-z\s]+$/', 'min:3', 'max:60'],
                    'phone_number' => ['required', 'numeric', 'digits_between:10,20'],
                    // 'status' => ['required', 'string', 'in:Y,N'],
                    // 'password' => ['required', Password::defaults()]
                ];
                break;
        }
        return $rules;
    }

    // private function getToken()
    // {
    //     $customer = CustomerModel::select(['password', 'name', 'customer_code'])->where('phone_number', $this->phone_number)->firstOrFail();
    //     if (! $customer || ! Hash::check($this->password, $customer->password)) {
    //         throw ValidationException::withMessages([
    //             'phone_number' => ['The provided credentials are incorrect.'],
    //         ]);
    //     }
    //     return $customer->createToken(str_replace(' ', '', $customer->name) . '-token')->plainTextToken;
    // }

    public function send_otp()
    {
        $otp = random_int(100000, 999999);
        do {
            $otp = random_int(100000, 999999);
        } while (CustomerModel::where('otp_code', $otp)->exists());

        $validated = $this->validated();
        $customer = CustomerModel::where('phone_number', $validated['phone_number']);
        if ($customer->exists()) {
            if (isset($customer->first()->expiration) && Carbon::now('Asia/Jakarta')->lte(Carbon::parse($customer->first()->expiration))) {
                throw ValidationException::withMessages([
                    'phone_number' => ['Can\'t get OTP in less than 15 minutes.']
                ]);
            } else {
                OTPModel::create([
                    'customer_id' => $customer->first()->customer_code,
                    'otp_code' => $otp
                ]);
                $customer->update([
                    'otp_code' => $otp,
                    'expiration' => Carbon::now('Asia/Jakarta')->addMinutes(15)
                ]);
            }
        } else {
            if (empty($this->name)) {
                throw ValidationException::withMessages([ 'name' => ['The name field is required when creating a new account.'] ]);
            }
            $validated['membership_status'] = 'R';
            $validated['status'] = 'Y';
            $validated['otp_code'] = $otp;
            $validated['expiration'] = Carbon::now('Asia/Jakarta')->addMinutes(15);
            $validated['customer_code'] = $this->getFormattedCode();
            $newCustomer = CustomerModel::create($validated);
            OTPModel::create([
                'customer_id' => $newCustomer->customer_code,
                'otp_code' => $otp
            ]);
        }

        $app_name = env('APP_NAME', 'GOR Badminton');

        $message = <<<EOT
        Dear customer,

        Your One-Time Password (OTP) code for verification is: $otp.
        This OTP code is valid for the next 15 minutes.

        Thank you for using our service.

        Sincerely,
        $app_name
        EOT;

        // $response = $this->sendWA($validated['phone_number'], $message, env('ZENZIVA_USER_KEY') ,env('ZENZIVA_API_KEY'));
        // return $response;
        return [
            'text' => 'Success',
            'to' => $this->phone_number
        ];
    }

    public function verify_otp()
    {
        $customer = CustomerModel::select(['otp_code', 'phone_number', 'name', 'customer_code', 'expiration', 'membership_status'])->where('otp_code', $this->otp_code)->firstOrFail();
        if (Carbon::now('Asia/Jakarta')->lte(Carbon::parse($customer->expiration))) {
            return [
                'token' => $customer->createToken(str_replace(' ', '', $customer->phone_number) . '-token')->plainTextToken,
                'customer' => $customer
            ];
        }
        throw ValidationException::withMessages([
            'otp_code' => ['The code has expired.']
        ]);
    }
}
