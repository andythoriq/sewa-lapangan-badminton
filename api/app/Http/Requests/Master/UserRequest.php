<?php

namespace App\Http\Requests\Master;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class UserRequest extends FormRequest
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
        $id = isset($this->user) ? ($this->user->id ?? null) : null;
        $validation = [];
        switch ($this->route()->getName()) {
            case 'update-user':
            case 'create-user':
            case 'register':
                $validation = [
                    'name' => ['required', 'string', 'max:90'],
                    'email' => ['required', 'string', 'email', 'max:90', Rule::unique('users', 'email')->ignore($id)],
                    'no_telp' => ['required', 'string', 'max:16', Rule::unique('users', 'no_telp')->ignore($id)],
                    'status' => ['required', 'string', 'in:Y,N'],
                    'role_id' => ['required', 'integer', 'exists:tb_role,id'],
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
        $user->updateOrFail($this->validated());
    }

    public function deleteUser(User $user)
    {
        $user->tokens()->delete();
        $user->deleteOrFail();
    }
}