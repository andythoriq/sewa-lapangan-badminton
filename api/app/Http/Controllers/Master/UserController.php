<?php

namespace App\Http\Controllers\Master;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use App\Http\Requests\AuthRequest as UserRequest;

class UserController extends Controller
{
    public function create(UserRequest $request)
    {
        $request->createUser();
        return response(null, 201, ['success' => 'New User created.']);
    }

    public function update(UserRequest $request, User $user)
    {
        $request->updateUser($user);
        return response(null, 204, ['success' => 'User updated.']);
    }

    public function delete(UserRequest $request, User $user)
    {
        $request->deleteUser($user);
        return response(null, 204, ['success' => 'User deleted.']);
    }

    public function index()
    {
        $users = User::select(['id', 'name', 'status'])->get();
        return new UserCollection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }
}
