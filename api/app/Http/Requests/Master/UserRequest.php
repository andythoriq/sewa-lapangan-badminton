<?php

namespace App\Http\Requests\Master;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'name' => ['required', 'string', 'max:90'],
            // 'email' => ['required', 'string', 'email', 'max:90', Rule::unique('users', 'email')->ignore($id)],
            'phone_number' => ['required', 'string', 'max:20', Rule::unique('users', 'phone_number')->ignore($id)],
            'status' => ['required', 'string', 'in:Y,N'],
            'role_id' => ['required', 'integer', 'exists:tb_role,id'],
            'password' => ['required', Password::defaults()],
        ];
    }



    public function createUser()
    {
        $validated = $this->validated();
        $validated['status'] = strtoupper($validated['status']);
        $validated['password'] = Hash::make($validated['password']);
        User::create($validated);
    }

    public function updateUser(User $user)
    {
        $user->updateOrFail($this->validated());
    }

}
