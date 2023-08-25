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
        return response()->json(['token' => $token], 201, ['success' => 'Logged in successfully.']);
    }

    public function register(RegisterRequest $request)
    {
        $request->doRegister();
        return response()->json(null, 201, ['success' => 'Registration successfully.']);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response(null,204, ['success' => 'Token deleted.']);
    }
}
