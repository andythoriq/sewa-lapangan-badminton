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
            'phone_number' => ['required', 'exists:tb_customer,phone_number'],
            'booking_code' => ['required', 'exists:tb_transaction,booking_code']
        ]);

        // $app_name = env('APP_NAME', 'GOR Badminton');

        // $message = <<<EOT
        // Dear valued customer,

        // We are pleased to confirm your booking with the following details:

        // Booking code: {$data['booking_code']}

        // bring this booking code to our on-site administrator.

        // Thank you for choosing our services. We look forward to serving you.

        // Best regards,
        // $app_name
        // EOT;

        $image_link = env('APP_URL') . '/public/storage/qr-code-images/' . $data['booking_code'] . '.png';

        $caption = 'Your booking code: *' . $data['booking_code'] . '*';
        $user_key = env('ZENZIVA_USER_KEY');
        $api_key = env('ZENZIVA_API_KEY');
        $response = $this->sendImage($data['phone_number'], $image_link, $caption, $user_key, $api_key);

        // $response = $this->sendWA($data['phone_number'], $message, env('ZENZIVA_USER_KEY'), env('ZENZIVA_API_KEY'));

        return response($response);
        // return response([
        //     'text' => 'Success'
        // ]);
    }
}
