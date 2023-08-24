<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return new UserResource();
    }

    public function register(RegisterRequest $request)
    {
        $request->doRegister();
        return response(['message' => 'Created'], 201);
    }
}
