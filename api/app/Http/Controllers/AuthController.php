<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $token = $request->getToken();
        return response()->json(['token' => $token], 201, ['success' => 'Success login.']);
    }

    public function register(RegisterRequest $request)
    {
        $request->doRegister();
        return response()->json(null, 201, ['success' => 'Success register.']);
    }

    public function logout(Request $request)
    {

        return response(null,204, ['success' => 'Success logout.']);
    }
}
