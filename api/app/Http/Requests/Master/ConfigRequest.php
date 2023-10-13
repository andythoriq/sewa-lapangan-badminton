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
            'slug' => ['required', 'alpha_dash', 'min:3', 'max:60', Rule::unique('tb_configuration', 'slug')->ignore($id)],
            'description' => ['required', 'max:128'],
            'value' => ['required', function ($attr, $value, $fail) {
                if ($value === '38569de2-6078-11ee-8c99-0242ac120002') {
                    $fail($attr . ': Company data is incomplete.');

                } else if ($value === '3fc8d328-6079-11ee-8c99-0242ac120002') {
                    $fail($attr . ': Invalid day name.');

                } else if ($value === '7a789d1e-6079-11ee-8c99-0242ac120002') {
                    $fail($attr . ': Start and finish times are required.');

                } else if ($value === '93a80a18-6079-11ee-8c99-0242ac120002') {
                    $fail($attr . ': Finish time must be after start time.');

                } else if ($value === 'ae004b00-6079-11ee-8c99-0242ac120002') {
                    $fail($attr . ': Start and finish times cannot be the same.');
                }
            }],
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
