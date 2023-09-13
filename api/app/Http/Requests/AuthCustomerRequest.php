<?php

namespace App\Http\Requests;

use App\Models\CustomerModel;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class AuthCustomerRequest extends FormRequest
{
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
            case 'login-customer':
                $rules = [
                    'phone_number' => ['required', 'string', 'max:20'],
                    'password' => ['required']
                ];
                break;
            case 'register-customer':
                $rules = [
                    'name' => ['required', 'string', 'max:90'],
                    'phone_number' => ['required', 'string', 'max:20', Rule::unique('tb_customer', 'phone_number')],
                    // 'status' => ['required', 'string', 'in:Y,N'],
                    'password' => ['required', Password::defaults()]
                ];
                break;
        }
        return $rules;
    }

    public function getToken()
    {
        $customer = CustomerModel::select(['password', 'name'])->where('phone_number', $this->phone_number)->firstOrFail();
        if (! $customer || Hash::check($this->password, $customer->password)) {
            throw ValidationException::withMessages([
                'phone_number' => ['The provided credentials are incorrect.'],
            ]);
        }
        return $customer->createToken($customer->name . '-token')->plainTextToken;
    }

    public function register()
    {
        $validated = $this->validated();
        $validated['membership_status'] = 'R';
        $validated['status'] = 'Y';
        $validated['password'] = Hash::make($validated['password']);
        CustomerModel::create($validated);
    }
}
