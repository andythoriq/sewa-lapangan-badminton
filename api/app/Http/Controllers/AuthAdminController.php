<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthAdminRequest;
use App\Http\Resources\Master\UserResource;

class AuthAdminController extends Controller
{
    public function login(AuthAdminRequest $request)
    {
        $token = $request->getToken();
        return response()->json($token, 201, ['success' => 'Token created successfully.']);
    }

    public function register(AuthAdminRequest $request)
    {
        $request->register();
        return response(null, 201, ['success' => 'Registration successfully.']);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response(null,204, ['success' => 'Token deleted.']);
    }

    public function me(Request $request)
    {
        return new UserResource($request->user()->loadMissing(['role:id,label,menu,status', 'rentals']));
    }

    public function login_for_other(AuthAdminRequest $request, User $admin)
    {
        $request->createTokenFor($admin);
        return response(null, 201, ['success' => 'Token for specific user created.']);
    }
}
