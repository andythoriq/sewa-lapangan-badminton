<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function me(Request $request)
    {
        return new UserResource($request->user());
    }

    public function edit(Request $request)
    {

    }

    public function update(Request $request)
    {

    }
}
