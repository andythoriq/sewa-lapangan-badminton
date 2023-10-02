<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

trait CreateQrCode
{
    public function createQrCode(string $booking_code, string $frontend_url)
    {
        $qrCodePath = 'qr-code-images/' . $booking_code . '.svg';
        // QrCode::size(250)->generate(env('APP_URL') . '/api/booking-verification/' . $booking_code, public_path("storage/$qrCodePath"));
        // QrCode::size(250)->generate(env('FRONTEND_URL') . '/booking-verification/' . $booking_code, public_path("storage/$qrCodePath"));
        // $image = QrCode::format('svg')->size(250)->generate(env('FRONTEND_URL') . '/booking-verification/' . $booking_code);
        $image = QrCode::format('svg')->size(250)->generate($frontend_url . '/scanner/' . $booking_code);
        Storage::disk('public')->put($qrCodePath, $image);
        // Storage::put($qrCodePath, $qrCode->output('png'));

        return $qrCodePath;
    }
}
