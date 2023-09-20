<?php

namespace App\Http\Controllers\Master;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\Master\UserResource;
use App\Http\Resources\Master\UserCollection;
use App\Http\Requests\Master\UserRequest;

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

    public function delete(User $user)
    {
        $user->tokens()->delete();
        $user->deleteOrFail();
        return response(null, 204, ['success' => 'User deleted.']);
    }

    public function index()
    {
        $users = User::select(['id', 'name', 'username', 'status', 'role_id'])->with('role:id,label')->get();
        return new UserCollection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user->loadMissing(['rentals', 'role:id,label,menu,status']));
    }
}
