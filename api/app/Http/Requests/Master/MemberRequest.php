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
        return [
            'name' => ['required', 'string', 'max:90'],
            'phone_number' => ['required', 'string', 'max:20', Rule::unique('tb_customer', 'phone_number')->ignore($customer_code, 'customer_code')],
            'deposit' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
            'debt' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
            'status' => ['required', 'string', 'in:Y,N'],
            // 'member_active_period' => ['required', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:now'],
            'member_active_period' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:now'],
        ];
    }

    public function createMember()
    {
        $customer = $this->validated();
        $customer['membership_status'] = 'M';
        $customer['status'] = strtoupper($customer['status']);
        $customer['customer_code'] = $this->getFormattedCode('m');
        CustomerModel::create($customer);
    }

    public function updateMember(CustomerModel $customer)
    {
        $customer->updateOrFail($this->validated());
    }
}
