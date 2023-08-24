<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
        return [
            'name' => ['required', 'string', 'max:90'],
            'email' => ['required', 'string', 'email', 'max:90', 'unique:users,email'],
            'no_telp' => ['required', 'string', 'max:16', 'unique:users,no_telp'],
            'status' => ['required', 'string', 'in:Y,N'],
            'role_id' => ['required', 'exists:tb_role,id'],
            'password' => ['required', Password::defaults()],
        ];
    }

    public function doRegister()
    {
        User::create($this->validated());
    }
}
