<?php

namespace App\Http\Requests;

use App\Models\CustomerModel;
use App\Traits\CustomerCodeFormat;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class AuthCustomerRequest extends FormRequest
{
    use CustomerCodeFormat;
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
                    'otp_code' => ['required', 'exists:tb_customer,otp_code']
                ];
                break;
            case 'send-otp':
                $rules = [
                    'name' => ['required', 'string', 'max:90'],
                    'phone_number' => ['required', 'string', 'max:20', Rule::unique('tb_customer', 'phone_number')],
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
        $customer = CustomerModel::select('customer_code')->where('phone_number', $validated['phone_number'])->firstOrFail();
        if ($customer) {
            $customer->update([
                'otp_code' => $otp
            ]);
        } else {
            $validated['membership_status'] = 'R';
            $validated['status'] = 'Y';
            $validated['otp_code'] = $otp;
            $validated['customer_code'] = $this->getFormattedCode('r');
            CustomerModel::create($validated);
        }

        // send . . .
    }

    public function verify_otp()
    {
        $customer = CustomerModel::select(['otp_code', 'phone_number', 'customer_code'])->where('otp_code', $this->otp_code)->firstOrFail();
        return $customer->createToken(str_replace(' ', '', $customer->phone_number) . '-token')->plainTextToken;
    }
}
