<?php

namespace App\Traits;
use App\Models\CustomerModel;
use Illuminate\Support\Carbon;

trait CheckMembershipStatus
{
    public function checkMembershipStatus($customer_code, $member_active_period)
    {
       if ($this->is_now_gt_active_period($customer_code, $member_active_period)) {
            return 'R';
       }
       return 'M';
    }

    public function checkActivePeriod($customer_code, $member_active_period)
    {
        if ($this->is_now_gt_active_period($customer_code, $member_active_period)) {
            return null;
        }
        return $member_active_period;
    }

    private function is_now_gt_active_period($customer_code, $member_active_period)
    {
        if (Carbon::now('Asia/Jakarta')->gt(Carbon::parse($member_active_period))) {
            CustomerModel::where('customer_code', $customer_code)->update([
                'membership_status' => 'R',
                'member_active_period' => null
            ]);
           return true;
        }
        return false;
    }
}
