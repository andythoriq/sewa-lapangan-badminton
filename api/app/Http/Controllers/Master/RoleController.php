<?php

namespace App\Http\Controllers\Master;

use App\Models\RoleModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\RoleRequest;
use App\Http\Resources\Master\RoleResource;
use App\Http\Resources\Master\RoleCollection;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->input('keyword');
        $roles = RoleModel::when($keyword, function($query) use ($keyword){
            $query->where('label', 'like', '%' . $keyword . '%');
        })
            ->select(['id', 'label', 'status'])->paginate(5);

        return new RoleCollection($roles);
    }

    public function edit(RoleModel $role)
    {
        return response()->json($role->only(['label', 'menu', 'status']));
    }

    public function create(RoleRequest $request)
    {
        $request->createRole();
        return response()->json(['message' => 'Role Created'], 201, ['success' => 'New role created.']);
    }

    public function update(RoleRequest $request, RoleModel $role)
    {
        $request->updateRole($role);
        return response()->json(['message' => 'Role updated'], 202, ['success' => 'Role updated.']);
    }

    public function delete(RoleModel $role)
    {
        $role->deleteOrFail();
        return response()->json(['message' => 'Role deleted'], 202, ['success' => 'Role deleted.']);
    }

    public function show(RoleModel $role)
    {
        return new RoleResource($role->loadMissing('users'));
    }
}
