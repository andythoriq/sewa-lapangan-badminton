<?php

namespace App\Http\Controllers\Master;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\UserRequest;
use App\Http\Resources\Master\UserResource;
use App\Http\Resources\Master\UserCollection;

class UserController extends Controller
{
    public function create(UserRequest $request)
    {
        $request->createUser();
        return response()->json(['message' => 'New User created'], 201, ['success' => 'New User created.']);
    }

    public function edit(User $user)
    {
        return response()->json($user->only(['name', 'username', 'phone_number', 'role_id', 'password', 'status']));
    }

    public function update(UserRequest $request, User $user)
    {
        $request->updateUser($user);
        return response()->json(['message' => 'User updated'], 202, ['success' => 'User updated.']);
    }

    public function delete(User $user)
    {
        $user->tokens()->delete();
        $user->deleteOrFail();
        return response()->json(['message' => 'User deleted'], 202, ['success' => 'User deleted.']);
    }

    public function index(Request $request)
    {
        $keyword = $request->input('keyword');

        $users = User::when($keyword, function ($query) use ($keyword) {
            $query->where('name', 'like', '%' . $keyword . '%')
                ->orWhere('username', 'like', '%' . $keyword . '%')
                ->orWhereHas('role', function ($roleQuery) use ($keyword) {
                    $roleQuery->where('label', 'like', '%' . $keyword . '%');
                });
        })
            ->select(['id', 'name', 'username', 'status', 'role_id'])
            ->with('role:id,label')
            ->paginate(5);

        return new UserCollection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user->loadMissing(['rentals', 'role:id,label,menu,status']));
    }
}
