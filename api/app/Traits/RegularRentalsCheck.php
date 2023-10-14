<?php

namespace App\Traits;

use App\Models\CustomerModel;
use Illuminate\Validation\ValidationException;

trait RegularRentalsCheck
{
    public function regularRentalsCheck(string $customer_code)
    {
        $customer = CustomerModel::with('rentals')->where('customer_code', $customer_code)->firstOrFail();

        if (strtoupper($customer->membership_status) == 'R') {

                throw ValidationException::withMessages([
                    'customer_id' => ['Regular customer can\'t booking multiple times.'],
                ]);
        }
    }
}
