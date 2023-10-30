<?php

namespace App\Traits;
use App\Models\ConfigModel;
use App\Models\HolidayModel;
use Illuminate\Support\Carbon;
// use Illuminate\Validation\ValidationException;

trait StartFinishBookingCheck
{
    public function holidayOperationalCollideCheck($bookingStart, $bookingFinish, $fail)
    {
        $operational_times = ConfigModel::getOpenTime();
        $rentalDay = strtolower(Carbon::parse($bookingStart, 'Asia/Jakarta')->dayName);

        $operationalTime = [];
        foreach ($operational_times as $time) {
            if ($time['day'] === $rentalDay) {
                $operationalTime = $time;
                break;
            }
        }

        if ($operationalTime) {
            $operationalStart = Carbon::parse($operationalTime['start'], 'Asia/Jakarta');
            $operationalFinish = Carbon::parse($operationalTime['finish'], 'Asia/Jakarta');

            $bookingStartTimestamp = Carbon::parse(Carbon::parse($bookingStart, 'Asia/Jakarta')->format('H:i'), 'Asia/Jakarta');
            $bookingFinishTimestamp = Carbon::parse(Carbon::parse($bookingFinish, 'Asia/Jakarta')->format('H:i'), 'Asia/Jakarta');

            if (! ($bookingStartTimestamp->gte($operationalStart) && $bookingFinishTimestamp->lte($operationalFinish))) {
                // throw ValidationException::withMessages([$attr => ['Your booking time is outside of ' . $rentalDay . ' operational hours.']]);
                $fail('Your booking time is outside of ' . $rentalDay . ' operational hours.');
            }
        } else {
            // throw ValidationException::withMessages([$attr => ['We are not operating today.']]);
            $fail('We are not operating today.');
        }

        $bookingStartDate = Carbon::parse($bookingStart, 'Asia/Jakarta')->format('Y-m-d');
        $bookingFinishDate = Carbon::parse($bookingFinish, 'Asia/Jakarta')->format('Y-m-d');

        $isHolidayCollide = HolidayModel::where('date', '>=', $bookingStartDate)->where('date', '<=', $bookingFinishDate)->exists();

        if ($isHolidayCollide) {
            // throw ValidationException::withMessages([$attr => ['Booking time collided with holidays.']]);
            $fail('Booking time collided with holidays.');
        }
    }

}
