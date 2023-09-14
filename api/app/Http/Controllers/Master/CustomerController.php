<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\MemberRequest;
use App\Http\Requests\Master\RegularRequest;
use App\Http\Resources\Master\MemberCollection;
use App\Http\Resources\Master\MemberResource;
use App\Http\Resources\Master\RegularCollection;
use App\Http\Resources\Master\RegularResource;
use App\Models\CustomerModel;

class CustomerController extends Controller
{
    public function index_M()
    {
        $members = CustomerModel::select(['customer_code', 'name', 'deposit', 'debt', 'member_active_period'])
            ->where('membership_status', 'M')
            ->orWhere('membership_status', 'm')
            ->get();
        return new MemberCollection($members);
    }

    public function index_R()
    {
        $regulars = CustomerModel::select(['customer_code', 'name', 'deposit', 'debt'])
            ->where('membership_status', 'R')
            ->orWhere('membership_status', 'r')
            ->get();
        return new RegularCollection($regulars);
    }

    public function show_M(CustomerModel $customer)
    {
        return new MemberResource($customer->loadMissing('rentals'));
    }

    public function show_R(CustomerModel $customer)
    {
        return new RegularResource($customer->loadMissing('rentals'));
    }

    public function create_M(MemberRequest $request)
    {
        $request->createMember();
        return response(null, 201, ['success' => 'New customer member created.']);
    }

    public function create_R(RegularRequest $request)
    {
        $request->createRegular();
        return response(null, 201, ['success' => 'New customer regular created.']);
    }

    public function update_M(MemberRequest $request, CustomerModel $customer)
    {
        $request->updateMember($customer);
        return response(null, 204, ['success' => 'Customer member updated.']);
    }

    public function update_R(RegularRequest $request, CustomerModel $customer)
    {
        $request->updateRegular($customer);
        return response(null, 204, ['success' => 'Customer regular updated.']);
    }

    public function delete_M(CustomerModel $customer)
    {
        $customer->deleteOrFail();
        return response(null, 204, ['success' => 'Customer member deleted.']);
    }

    public function delete_R(CustomerModel $customer)
    {
        $customer->deleteOrFail();
        return response(null, 204, ['success' => 'Customer regular deleted.']);
    }
}
