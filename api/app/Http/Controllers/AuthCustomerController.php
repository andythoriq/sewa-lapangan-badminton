<?php

namespace App\Http\Controllers;

use App\Http\Resources\Master\MemberResource;
use App\Http\Resources\Master\RegularResource;
use Illuminate\Http\Request;
use App\Http\Requests\AuthCustomerRequest;

class AuthCustomerController extends Controller
{
    // public function login(AuthCustomerRequest $request)
    // {
    //     $token = $request->getToken();
    //     return response()->json($token, 201, ['success' => 'Login successfully.']);
    // }

    public function send(AuthCustomerRequest $request)
    {
        $result = $request->send_otp();
        return response()->json($result, 201, ['success' => 'OTP sended successfully.']);
    }

    public function verify(AuthCustomerRequest $request)
    {
        $request->verify_otp();
        return response(null, 201, ['success' => 'OTP verified successfully.']);
    }

    public function logout(Request $request)
    {
        $request->user('customers')->tokens()->delete();
        return response(null, 204, ['success' => 'Logged out successfully.']);
    }

    public function me(Request $request)
    {
        $customer = $request->user('customers');

        if(strtoupper($customer->membership_status == 'M')){
            return new MemberResource($customer->loadMissing('rentals'));
        }else if(strtoupper($customer->membership_status == 'R')){
            return new RegularResource($customer->loadMissing('rentals'));
        }
    }
}
