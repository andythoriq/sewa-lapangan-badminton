<?php

namespace App\Traits;
use App\Models\ConfigModel;
use App\Models\HolidayModel;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

trait StartFinishBookingCheck
{
    public function startFinishCheck($bookingStart, $bookingFinish)
    {
        $operational_times = ConfigModel::getOpenTime();
        $currentDay = strtolower(Carbon::now('Asia/Jakarta')->dayName);

        $operationalTimeToday = [];
        foreach ($operational_times as $time) {
            if ($time['day'] === $currentDay) {
                $operationalTimeToday = $time;
                break;
            }
        }

        if ($operationalTimeToday) {
            $operationalStart = Carbon::parse($operationalTimeToday['start'], 'Asia/Jakarta');
            $operationalFinish = Carbon::parse($operationalTimeToday['finish'], 'Asia/Jakarta');

            $bookingStartTimestamp = Carbon::parse(Carbon::parse($bookingStart, 'Asia/Jakarta')->format('H:i'), 'Asia/Jakarta');
            $bookingFinishTimestamp = Carbon::parse(Carbon::parse($bookingFinish, 'Asia/Jakarta')->format('H:i'), 'Asia/Jakarta');

            if (! ($bookingStartTimestamp->gte($operationalStart) && $bookingFinishTimestamp->lte($operationalFinish))) {
                throw ValidationException::withMessages(['start' => ['Your booking time is outside of operational hours.']]);
            }
        } else {
            throw ValidationException::withMessages(['start' => ['We are not operating today.']]);
        }

        $bookingStartDate = Carbon::parse($bookingStart, 'Asia/Jakarta')->format('Y-m-d');
        $bookingFinishDate = Carbon::parse($bookingFinish, 'Asia/Jakarta')->format('Y-m-d');

        $isHolidayCollide = HolidayModel::where('date', '>=', $bookingStartDate)->where('date', '<=', $bookingFinishDate)->exists();

        if ($isHolidayCollide) {
            throw ValidationException::withMessages(['start' => ['Booking time collided with holidays.']]);
        }
    }

}
