<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class AuthRequest extends FormRequest
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
            case 'register':
                $validation = [
                    'name' => ['required', 'string', 'max:90'],
                    'email' => ['required', 'string', 'email', 'max:90', 'unique:users,email'],
                    'no_telp' => ['required', 'string', 'max:16', 'unique:users,no_telp'],
                    'status' => ['required', 'string', 'in:Y,N'],
                    'role_id' => ['required', 'exists:tb_role,id'],
                    'password' => ['required', Password::defaults()],
                ];

            case 'login':
                $validation = [
                    'email' => ['required', 'email'],
                    'password' => ['required'],
                ];
        }
        return $validation;
    }

    public function getToken()
    {
        $user = User::select(['password', 'id'])->where('email', $this->email)->firstOrFail();

        if (! $user || ! Hash::check($this->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        return $user->createToken('token')->plainTextToken;
    }

    public function doRegister()
    {
        $validated = $this->validated();
        $validated['password'] = Hash::make($validated['password']);
        User::create($validated);
    }
}
