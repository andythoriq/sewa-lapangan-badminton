<?php

namespace App\Http\Requests\Master;

use App\Models\CustomerModel;
use Illuminate\Validation\Rule;
use App\Traits\CustomerCodeFormat;
use Illuminate\Foundation\Http\FormRequest;

class MemberRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:90'],
            'phone_number' => ['required', 'string', 'max:20', Rule::unique('tb_customer', 'phone_number')->ignore($customer_code, 'customer_code')],
            'deposit' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
            'debt' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
            'status' => ['required', 'string', 'in:Y,N'],
            'member_active_period' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:now'],
        ];

        if ($this->route()->getName() == 'update-member') {
            $rule = [
                'name' => ['required', 'string', 'max:90'],
                'phone_number' => ['required', 'string', 'max:20', Rule::unique('tb_customer', 'phone_number')->ignore($customer_code, 'customer_code')],
                'deposit' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
                'debt' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
                'status' => ['required', 'string', 'in:Y,N'],
                'isChangeToRegular' => ['nullable', 'boolean'],
                'member_active_period' => [($this->isChangeToRegular == true ? 'nullable' : 'required'), 'date', 'date_format:Y-m-d', 'after_or_equal:now'],
            ];
        }
        return $rule;
    }

    public function createMember()
    {
        $customer = $this->except('isChangeToRegular');
        $customer['membership_status'] = 'M';
        $customer['status'] = strtoupper($customer['status']);
        $customer['customer_code'] = $this->getFormattedCode('m');
        CustomerModel::create($customer);
    }

    public function updateMember(CustomerModel $customer)
    {
        if ($this->isChangeToRegular) {
            $data = $this->except('isChangeToRegular');
            $data['membership_status'] = 'R';
            $data['member_active_period'] = null;
            $data['customer_code'] = $this->getFormattedCode('r');
            $customer->updateOrFail($data);
        } else {
            $customer->updateOrFail($this->except('isChangeToRegular'));
        }
    }
}
