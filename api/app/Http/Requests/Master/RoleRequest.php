<?php

namespace App\Http\Requests\Master;

use App\Models\RoleModel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
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
        $id = isset($this->role) ? ($this->role->id ?? null) : null;
        return [
            'label' => ['required', 'alpha', 'min:3', 'max:20', Rule::unique('tb_role', 'label')->ignore($id)],
            'menu' => ['required', 'string', 'max:191'],
            'status' => ['required', 'string', 'in:Y,N'],
        ];
    }

    public function createRole()
    {
        $role = $this->validated();
        $role['status'] = strtoupper($role['status']);
        RoleModel::create($this->validated());
    }

    public function updateRole(RoleModel $role)
    {
        $role->updateOrFail($this->validated());
    }
}
