<?php

namespace App\Http\Requests\Master;

use App\Models\CustomerModel;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
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
        $customer_code = isset($this->customer) ? ($this->customer->customer_code ?? null) : null;
        return [
            'nama' => ['required', 'string', 'max:90'],
            'phone_number' => ['required', 'string', 'max:16', Rule::unique('tb_customer', 'phone_number')->ignore($customer_code, 'customer_code')],
            'deposit' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
            'debt' => ['nullable', 'numeric', 'min:0.01', 'max:1000000.00'],
            'status' => ['required', 'string', 'in:M,R'],
            'member_active_period' => ['nullable', 'date', 'date_format:Y-m-d H:i:s', 'after_or_equal:' . now('Asia/Jakarta')->format('Y-m-d H:i:s')]
        ];
    }

    public function createMember()
    {
        $customer = $this->validated();
        $customer['customer_code'] = $this->getFormattedCP('m');
        CustomerModel::create($customer);
    }

    public function createRegular()
    {
        $customer = $this->validated();
        $customer['customer_code'] = $this->getFormattedCP('r');
        CustomerModel::create($customer);
    }

    public function updateCustomer(CustomerModel $customer)
    {
        $customer->updateOrFail($this->validated());
    }

    private function getFormattedCP(string $prefix) : string
    {
        $max_customer_code =  CustomerModel::max('customer_code') ?? 0;
        $incremented = (string) ($max_customer_code + 1);

        return $prefix . date('Ym') . str_pad($incremented, 3, '0', STR_PAD_LEFT);
    }
}
