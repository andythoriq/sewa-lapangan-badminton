<?php

namespace App\Http\Requests\Master;

use App\Models\ConfigModel;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ConfigRequest extends FormRequest
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
        $id = isset($this->config) ? ($this->config->id ?? null) : null;
        return  [
            'slug' => ['required', 'alpha_dash', 'min:3', 'max:90', Rule::unique('tb_configuration', 'slug')->ignore($id)],
            'description' => ['required', 'max:90'],
            'value' => ['required', 'max:191'],
        ];
    }

    public function createConfig()
    {
        ConfigModel::create($this->validated());
    }

    public function updateConfig(ConfigModel $config)
    {
        $config->updateOrFail($this->validated());
    }
}
