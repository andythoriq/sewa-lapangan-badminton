<?php

namespace App\Traits;
use App\Models\ConfigModel;
use App\Models\HolidayModel;
use Illuminate\Validation\ValidationException;

trait StartFinishBookingCheck
{
    public function startFinishCheck($bookingStart, $bookingFinish)
    {
        $operational_times = ConfigModel::getOpenTime();

        $currentDay = strtolower(date('l'));

        $operationalTimeToday = null;
        foreach ($operational_times as $time) {
            if ($time['day'] === $currentDay) {
                $operationalTimeToday = $time;
                break;
            }
        }

        if ($operationalTimeToday) {
            $operationalStart = strtotime($operationalTimeToday['start']);
            $operationalFinish = strtotime($operationalTimeToday['finish']);

            $bookingStartTimestamp = strtotime($bookingStart);
            $bookingFinishTimestamp = strtotime($bookingFinish);

            if (!($bookingStartTimestamp >= $operationalStart && $bookingFinishTimestamp <= $operationalFinish)) {
                throw ValidationException::withMessages(['start' => ['Your booking time is outside of operational hours.']]);
            }
        } else {
            throw ValidationException::withMessages(['start' => ['We are not operating today.']]);
        }

        $isHolidayCollide = HolidayModel::where('date', '>=', date('Y-m-d', $bookingStartTimestamp))
            ->where('date', '<=', date('Y-m-d', $bookingFinishTimestamp))
            ->exists();

        if ($isHolidayCollide) {
            throw ValidationException::withMessages([ 'start' => ['Booking time collided with holidays.']]);
        }
    }
}
