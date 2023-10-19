<?php

namespace App\Http\Requests;

use App\Models\ConfigModel;
use App\Models\NotificationModel;
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
            case 'send-otp-register':
                $rules = [
                    'name' => ['required', 'regex:/^[A-Z][a-z]+((\s[A-Z][a-z]+)*)$/u', 'min:3', 'max:60'],
                    'phone_number' => ['required', 'numeric', 'digits_between:10,20', 'unique:tb_customer,phone_number'],
                    // 'status' => ['required', 'string', 'in:Y,N'],
                    // 'password' => ['required', Password::defaults()]
                ];
                break;
            case 'send-otp-login':
                $rules = [
                    'phone_number' => ['required', 'exists:tb_customer,phone_number'],
                ];
        }
        return $rules;
    }

    public function messages()
    {
        return [
            'otp_code.exists' => 'OTP code is invalid, please try again.',
            'phone_number.exists' => 'invalid_phone_number',
            'phone_number.unique' => 'phone_number_has_been_taken'
        ];
    }

    private function generate_otp()
    {
        $otp = random_int(100000, 999999);
        do {
            $otp = random_int(100000, 999999);
        } while (CustomerModel::where('otp_code', $otp)->exists());

        return $otp;
    }

    private function send_otp($otp, $expire_minutes, $recent_resend, $resend_limit, $customer)
    {
        $message = <<<EOT
        Use $otp as OTP to sign in to this app NEVER SHARE OTP with anyone.

        This OTP code is valid for the next $expire_minutes minutes.
        EOT;

        $user_key = env('ZENZIVA_USER_KEY');
        $api_key = env('ZENZIVA_API_KEY');
        $response = $this->sendWA($customer->phone_number, $message,  $user_key, $api_key);
        // $response = json_encode([
        //     'text' => 'Success',
        //     'to' => $this->phone_number
        // ]);
        return [
            'response' => json_decode($response, true),
            'phone_number' => $customer->phone_number,
            'expiration' => [
                'recent_resend' => $recent_resend,
                'resend_limit' => $resend_limit,
                'customer_expiration' => $customer->expiration
            ]
        ];
    }

    public function login() // bisa digunakan untuk login maupun resend/relogin
    {
        $expire_minutes = ConfigModel::getExpireDuration();
        $resend_limit = ConfigModel::getResendLimit();
        $recent_resend = 0;
        $otp = $this->generate_otp();

        $validated = $this->validated();
        $customer = CustomerModel::where('phone_number', $validated['phone_number'])->first();

        $recent_resend = OTPModel::where('customer_id', $customer->customer_code)
            ->where('created_at', '>=', Carbon::now()->subMinutes($expire_minutes))
            ->count();

        if ($customer->expiration && Carbon::now('Asia/Jakarta')->gt(Carbon::parse($customer->expiration, 'Asia/Jakarta'))) {
            OTPModel::where('customer_id', $customer->customer_code)->whereDate('created_at', Carbon::now('Asia/Jakarta')->format('Y-m-d'))->delete();
            $recent_resend = 0;
        }

        if ($this->input('normal-login') == 'true' && ($customer->expiration && Carbon::now('Asia/Jakarta')->lte(Carbon::parse($customer->expiration, 'Asia/Jakarta')))) {
            $expire_time = Carbon::parse($customer->expiration);

            $remaining_seconds = Carbon::now('Asia/Jakarta')->diffInSeconds($expire_time);

            if ($remaining_seconds > 0) {
                $minutes = floor(($remaining_seconds % 3600) / 60);
                $seconds = $remaining_seconds % 60;

                $remaining_seconds_text = '';
                $expire_minutes_text = '';

                if ($minutes > 0) {
                    if (! empty($remaining_seconds_text)) {
                        $remaining_seconds_text .= ' and ';
                    }
                    $remaining_seconds_text .= "$minutes " . ($minutes > 1 ? 'minutes' : 'minute');
                }
                if ($seconds > 0) {
                    if (! empty($remaining_seconds_text)) {
                        $remaining_seconds_text .= ' and ';
                    }
                    $remaining_seconds_text .= "$seconds " . ($seconds > 1 ? 'seconds' : 'second');
                }
                if ($expire_minutes > 0) {
                    $expire_minutes_text .= "$expire_minutes " . ($expire_minutes > 1 ? 'minutes' : 'minute');
                }
            }
            throw ValidationException::withMessages([
                'phone_number' => ["expire in $expire_minutes_text already defined since signin/register. Wait until about $remaining_seconds_text."]
            ]);
        }
        else if ($this->input('re-login') == 'true' && ($recent_resend > $resend_limit)) {
            $expire_minutes_text = '';
            if ($expire_minutes > 0) {
                $expire_minutes_text .= "$expire_minutes " . ($expire_minutes > 1 ? 'minutes' : 'minute');
            }

            throw ValidationException::withMessages([
                'otp_code' => [
                    "You can't resend OTP more than $resend_limit times in $expire_minutes_text."
                ]
            ]);
        }

        OTPModel::create([
            'customer_id' => $customer->customer_code,
            'otp_code' => $otp
        ]);
        $customer->update([
            'otp_code' => $otp,
            'expiration' => Carbon::now('Asia/Jakarta')->addMinutes($expire_minutes)
        ]);
        $customer_data = CustomerModel::select(['name', 'membership_status'])->where('phone_number', $validated['phone_number'])->first();
        NotificationModel::customerLoggedIn($customer_data->name, $validated['phone_number'], $customer_data->membership_status);

        return $this->send_otp($otp, $expire_minutes, $recent_resend, $resend_limit, $customer);
    }

    public function register()
    {
        $otp = $this->generate_otp();
        $expire_minutes = ConfigModel::getExpireDuration();
        $recent_resend = 0;
        $resend_limit = ConfigModel::getResendLimit();

        $validated = $this->validated();
        $validated['membership_status'] = 'R';
        $validated['status'] = 'Y';
        $validated['otp_code'] = $otp;
        $validated['expiration'] = Carbon::now('Asia/Jakarta')->addMinutes($expire_minutes);
        $validated['customer_code'] = $this->getFormattedCode();
        $customer = CustomerModel::create($validated);
        OTPModel::create([
            'customer_id' => $customer->customer_code,
            'otp_code' => $otp
        ]);
        NotificationModel::customerRegistered($customer->name, $customer->phone_number);

        return $this->send_otp($otp, $expire_minutes, $recent_resend, $resend_limit, $customer);
    }

    public function verify_otp()
    {
        $customer = CustomerModel::select(['otp_code', 'phone_number', 'name', 'customer_code', 'expiration', 'membership_status'])->where('otp_code', $this->otp_code)->firstOrFail();
        if (Carbon::now('Asia/Jakarta')->lte(Carbon::parse($customer->expiration, 'Asia/Jakarta'))) {
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
