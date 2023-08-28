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
            case 'update-user':
            case 'create-user':
            case 'register':
                $validation = [
                    'name' => ['required', 'string', 'max:90'],
                    'email' => ['required', 'string', 'email', 'max:90', 'unique:users,email,' . $this->user->id],
                    'no_telp' => ['required', 'string', 'max:16', 'unique:users,no_telp,' . $this->user->id],
                    'status' => ['required', 'string', 'in:Y,N'],
                    'role_id' => ['required', 'exists:tb_role,id'],
                    'password' => ['required', Password::defaults()],
                ];
                break;

            case 'login':
                $validation = [
                    'email' => ['required', 'email'],
                    'password' => ['required'],
                ];
                break;
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

    public function createUser()
    {
        $validated = $this->validated();
        $validated['password'] = Hash::make($validated['password']);
        User::create($validated);
    }

    public function updateUser(User $user)
    {
        $user->fill($this->validated());
        $user->saveOrFail();
    }

    public function deleteUser(User $user)
    {
        if ($user->id === auth()->id()) {
            auth()->logout();
        }
        $user->tokens()->delete();
        $user->delete();
    }
}
