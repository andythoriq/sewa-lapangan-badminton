<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function login(AuthRequest $request)
    {
        $token = $request->getToken();
        return response()->json($token, 201, ['success' => 'Logged in successfully.']);
    }

    public function register(AuthRequest $request)
    {
        $request->createUser();
        return response(null, 201, ['success' => 'Registration successfully.']);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response(null,204, ['success' => 'Token deleted.']);
    }

    public function me(Request $request)
    {
        return new UserResource($request->user()->loadMissing('role:id,label,menu,status'));
    }
}
