<?php

namespace App\Http\Requests\Master;

use App\Models\CustomerModel;
use Illuminate\Validation\Rule;
use App\Traits\CustomerCodeFormat;
use Illuminate\Foundation\Http\FormRequest;

class RegularRequest extends FormRequest
{
    use CustomerCodeFormat;
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
        $customer_code = isset($this->customer) ? ($this->customer->customer_code ?? null) : null;

        $rule = [
            'name' => ['required', 'regex:/^[A-Za-z\s]+$/', 'min:3', 'max:60'],
            'phone_number' => ['required', 'numeric', 'digits_between:10,20', Rule::unique('tb_customer', 'phone_number')->ignore($customer_code, 'customer_code')],
            'deposit' => ['nullable', 'numeric', 'max:1000000.00'],
            'debt' => ['nullable', 'numeric', 'max:1000000.00'],
            'status' => ['required', 'string', 'in:Y,N'],
        ];

        if ($this->route()->getName() == 'update-regular') {
            $rule = [
                'name' => ['required', 'regex:/^[A-Za-z\s]+$/', 'min:3', 'max:60'],
                'phone_number' => ['required', 'numeric', 'digits_between:10,20', Rule::unique('tb_customer', 'phone_number')->ignore($customer_code, 'customer_code')],
                'deposit' => ['nullable', 'numeric', 'max:1000000.00'],
                'debt' => ['nullable', 'numeric', 'max:1000000.00'],
                'status' => ['required', 'string', 'in:Y,N'],
                'isChangeToMember' => ['nullable', 'boolean'],
                'member_active_period' => [($this->isChangeToMember == true ? 'required' : 'nullable'), 'date', 'date_format:Y-m-d', 'after_or_equal:now']
            ];
        }
        return $rule;
    }

    public function createRegular()
    {
        $customer = $this->except(['isChangeToMember', 'member_active_period']);
        $customer['membership_status'] = 'R';
        $customer['status'] = strtoupper($customer['status']);
        $customer['customer_code'] = $this->getFormattedCode();
        CustomerModel::create($customer);
    }

    public function updateRegular(CustomerModel $customer)
    {
        if ($this->isChangeToMember) {
            $data = $this->except('isChangeToMember');
            $data['membership_status'] = 'M';
            $customer->updateOrFail($data);
        } else {
            $customer->updateOrFail($this->except('isChangeToMember'));
        }
    }
}
