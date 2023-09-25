<?php

namespace App\Traits;

use App\Models\CustomerModel;

trait CustomerCodeFormat
{
    public function getFormattedCode(string $prefix)
    {
        $max_customer_code = CustomerModel::count();
        $incremented = $max_customer_code + 1;

        $attempt = 1;
        do {
            $customer_code = $prefix . date('Ym') . str_pad((string) $incremented + $attempt, 3, '0', STR_PAD_LEFT);
            $attempt++;
        } while (CustomerModel::where('customer_code', $customer_code)->exists());

        return $customer_code;
    }
}
