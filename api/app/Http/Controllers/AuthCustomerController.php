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

    public function register(AuthCustomerRequest $request)
    {
        $result = $request->register();
        return response($result, 201);
    }

    public function login(AuthCustomerRequest $request)
    {
        $result = $request->login();
        return response($result, 201);
    }

    public function verify(AuthCustomerRequest $request)
    {
        $token = $request->verify_otp();
        return response()->json($token, 201, ['success' => 'OTP verified successfully.']);
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
            return new MemberResource($customer->loadMissing('rentals', 'rentals.court:id,label', 'rentals.transaction:id,booking_code'));
        }else if(strtoupper($customer->membership_status == 'R')){
            return new RegularResource($customer->loadMissing('rentals', 'rentals.court:id,label', 'rentals.transaction:id,booking_code'));
        }
    }
}
