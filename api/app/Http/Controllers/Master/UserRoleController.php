<?php

namespace App\Http\Controllers\Master;

use App\Models\RoleModel;
use App\Http\Requests\RoleRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Http\Resources\RoleCollection;

class UserRoleController extends Controller
{
    public function index()
    {
        $roles = RoleModel::select(['id', 'label', 'status'])->get();
        return new RoleCollection($roles);
    }

    public function create(RoleRequest $request)
    {
        $request->createRole();
        return response(null, 201, ['success' => 'New role created.']);
    }

    public function update(RoleRequest $request, RoleModel $role)
    {
        $request->updateRole($role);
        return response(null, 204, ['success' => 'Role updated.']);
    }

    public function delete(RoleModel $role)
    {
        $role->deleteOrFail();
        return response(null, 204, ['success' => 'Role deleted.']);
    }

    public function show(RoleModel $role)
    {
        return new RoleResource($role->loadMissing('users'));
    }
}
