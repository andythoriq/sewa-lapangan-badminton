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

        $caption = 'Booking code: ' . $data['booking_code'];

        $response = $this->sendImage($data['phone_number'], 'https://picsum.photos/id/995/200/300.jpg', $caption);

        return response()->json($response);
    }
}
