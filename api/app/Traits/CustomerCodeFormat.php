<?php

namespace App\Traits;

use App\Models\CustomerModel;

trait CustomerCodeFormat
{
    public function getFormattedCode()
    {
        $latest = CustomerModel::select('customer_code')->latest()->firstOrFail();
        if (! $latest) {
            $incremented = 0;
        } else {
            $latestCode = $latest->customer_code;
            $latestDate = substr($latestCode, 0, 6);

            if (date('ymd') == $latestDate) {
                $incremented = (int) substr($latestCode, -3) + 1;
            } else {
                $incremented = 1;
            }
        }

        do {
            $incremented = str_pad($incremented, 3, '0', STR_PAD_LEFT);

            $customer_code = date('ymd') . $incremented;

            $existingCustomer = CustomerModel::where('customer_code', $customer_code)->exists();

            if ($existingCustomer) {
                $incremented++;
            }
        } while ($existingCustomer);

        return $customer_code;
    }
}
