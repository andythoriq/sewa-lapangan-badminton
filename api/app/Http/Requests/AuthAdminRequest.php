<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class AuthAdminRequest extends FormRequest
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
        $validation = [];
        switch ($this->route()->getName()) {
            case 'register-admin':
                $validation = [
                    'name' => ['required', 'string', 'max:90'],
                    // 'email' => ['required', 'string', 'email', 'max:90', Rule::unique('users', 'email')],
                    'phone_number' => ['required', 'string', 'max:20', Rule::unique('users', 'phone_number')],
                    // 'status' => ['required', 'string', 'in:Y,N'],
                    'role_id' => ['required', 'integer', 'exists:tb_role,id'],
                    'password' => ['required', Password::defaults()],
                ];
                break;

            case 'login-admin':
                $validation = [
                    // 'email' => ['required', 'email'],
                    'phone_number' => ['required', 'string', 'max:20'],
                    'password' => ['required'],
                ];
                break;
        }
        return $validation;
    }

    public function getToken()
    {
        // $user = User::select(['password', 'name'])->where('email', $this->email)->firstOrFail();
        $user = User::select(['password', 'name'])->where('phone_number', $this->phone_number)->firstOrFail();

        if (! $user || ! Hash::check($this->password, $user->password)) {
            throw ValidationException::withMessages([
                'phone_number' => ['The provided credentials are incorrect.'],
            ]);
        }
        return $user->createToken($user->name . '-token')->plainTextToken;
    }

    public function register()
    {
        $validated = $this->validated();
        $validated['status'] = 'Y';
        $validated['password'] = Hash::make($validated['password']);
        User::create($validated);
    }

    public function createTokenFor(User $admin)
    {
        $admin->createToken($admin->name . '-token');
    }
}