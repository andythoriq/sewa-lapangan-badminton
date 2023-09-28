<?php

namespace App\Http\Controllers;

use App\Models\TransactionModel;
use App\Traits\SendWA;
use Illuminate\Http\Request;

class SendBookingCodeController extends Controller
{
    use SendWA;
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'phone_number' => ['required', 'string', 'exists:tb_customer,phone_number'],
            'booking_code' => ['required', 'string', 'exists:tb_transaction,booking_code']
        ]);

        $message = <<<EOT
        Dear valued customer,

        We are pleased to confirm your booking with the following details:

        Booking code: {$data['booking_code']}

        Thank you for choosing our services. We look forward to serving you.

        Best regards,
        {env('APP_NAME', 'GOR Badminton')}
        EOT;


        // $image_link = public_path('storage/qr-code-images/') . $data['booking_code'] . 'svg';

        // $response = $this->sendImage($data['phone_number'], $image_link, $caption);

        $response = $this->sendWA($data['phone_number'], $message, env('ZENZIVA_USER_KEY'), env('ZENZIVA_API_KEY'));

        return response($response);
    }
}
