<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\CustomerRequest;
use App\Http\Resources\Master\CustomerCollection;
use App\Http\Resources\Master\CustomerResource;
use App\Models\CustomerModel;

class CustomerController extends Controller
{
    public function index_M()
    {
        $member = CustomerModel::select(['customer_code', 'name', 'deposit', 'debt',])
            ->where('status', 'M')
            ->orWhere('status', 'm')
            ->get();
        return new CustomerCollection($member);
    }

    public function index_R()
    {
        $regular = CustomerModel::select(['customer_code', 'name', 'deposit', 'debt'])
            ->where('status', 'R')
            ->orWhere('status', 'r')
            ->get();
        return new CustomerCollection($regular);
    }

    public function show_M(CustomerModel $customer)
    {
        return new CustomerResource($customer->loadMissing('rentals'));
    }

    public function show_R(CustomerModel $customer)
    {
        return new CustomerResource($customer->loadMissing('rentals'));
    }

    public function create_M(CustomerRequest $request)
    {
        $request->createMember();
        return response(null, 201, ['success' => 'New customer member created.']);
    }

    public function create_R(CustomerRequest $request)
    {
        $request->createRegular();
        return response(null, 201, ['success' => 'New customer regular created.']);
    }

    public function update_M(CustomerRequest $request, CustomerModel $customer)
    {
        $request->updateCustomer($customer);
        return response(null, 204, ['success' => 'Customer member updated.']);
    }

    public function update_R(CustomerRequest $request, CustomerModel $customer)
    {
        $request->updateCustomer($customer);
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
