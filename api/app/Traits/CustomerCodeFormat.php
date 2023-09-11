<?php

namespace App\Traits;

use App\Models\CustomerModel;

trait CustomerCodeFormat
{
    public function getFormattedCode(string $prefix)
    {
        $max_customer_code = CustomerModel::count();
        $incremented = $max_customer_code + 1;

        return $prefix . date('Ym') . str_pad((string) $incremented, 3, '0', STR_PAD_LEFT);
    }
}
