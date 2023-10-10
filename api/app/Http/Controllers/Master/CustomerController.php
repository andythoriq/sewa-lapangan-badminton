<?php

namespace App\Http\Controllers\Master;

use Illuminate\Http\Request;
use App\Models\CustomerModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\MemberRequest;
use App\Http\Requests\Master\RegularRequest;
use App\Http\Resources\Master\MemberResource;
use App\Http\Resources\Master\RegularResource;
use App\Http\Resources\Master\MemberCollection;
use App\Http\Resources\Master\RegularCollection;

class CustomerController extends Controller
{
    public function index_M(Request $request)
    {
        $keyword = $request->input('keyword');

        $members = CustomerModel::where(function ($query) use ($keyword) {
            $query->where('name', 'like', '%' . $keyword . '%')
                ->orWhere('phone_number', 'like', '%' . $keyword . '%')
                ->orWhere('deposit', 'like', '%' . $keyword . '%')
                ->orWhere('debt', 'like', '%' . $keyword . '%')
                ->orWhere('member_active_period', 'like', '%' . $keyword . '%');
        })
            ->where(function ($query) {
                $query->where('membership_status', 'M')
                    ->orWhere('membership_status', 'm');
            })
            ->select(['customer_code', 'name', 'phone_number', 'deposit', 'debt', 'status', 'member_active_period'])
            ->paginate(10);

        return new MemberCollection($members);
    }

    public function index_R(Request $request)
    {
        $keyword = $request->input('keyword');

        $regulars = CustomerModel::where(function ($query) use ($keyword) {
            $query->where('name', 'like', '%' . $keyword . '%')
                ->orWhere('phone_number', 'like', '%' . $keyword . '%')
                ->orWhere('deposit', 'like', '%' . $keyword . '%')
                ->orWhere('debt', 'like', '%' . $keyword . '%');
        })
            ->where(function ($query) {
                $query->where('membership_status', 'R')
                    ->orWhere('membership_status', 'r');
            })
            ->select(['customer_code', 'name', 'phone_number', 'deposit', 'debt', 'status'])
            ->paginate(10);

        return new RegularCollection($regulars);
    }

    public function select_M()
    {
        $members = CustomerModel::where('membership_status', 'M')->select(['customer_code', 'name', 'phone_number', 'member_active_period'])->get();
        return response()->json($members);
    }

    public function select_R()
    {
        $regulars = CustomerModel::where('membership_status', 'R')->select(['customer_code', 'name', 'phone_number'])->get();
        return response()->json($regulars);
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
        return response()->json(['message' => 'Success create member customer'], 201, ['success' => 'New customer member created.']);
    }

    public function create_R(RegularRequest $request)
    {
        $request->createRegular();
        return response()->json(['message' => 'Success create regular customer'], 201, ['success' => 'New customer regular created.']);
    }

    public function edit_M(CustomerModel $customer)
    {
        return response()->json($customer->only(['name', 'phone_number', 'deposit', 'debt', 'member_active_period', 'status']));
    }

    public function edit_R(CustomerModel $customer)
    {
        return response()->json($customer->only(['name', 'phone_number', 'deposit', 'debt', 'status']));
    }

    public function update_M(MemberRequest $request, CustomerModel $customer)
    {
        $request->updateMember($customer);
        return response()->json(['message' => 'Success update member customer'], 202, ['success' => 'Customer member updated.']);
    }

    public function update_R(RegularRequest $request, CustomerModel $customer)
    {
        $request->updateRegular($customer);
        return response()->json(['message' => 'Success update regular customer'], 202, ['success' => 'Customer regular updated.']);
    }

    public function delete_M(CustomerModel $customer)
    {
        $customer->deleteOrFail();
        return response()->json(['message' => 'Success delete member customer'], 202, ['success' => 'Customer member deleted.']);
    }

    public function delete_R(CustomerModel $customer)
    {
        $customer->deleteOrFail();
        return response()->json(['message' => 'Success delete regular customer'], 202, ['success' => 'Customer regular deleted.']);
    }

    public function update_name(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'regex:/^[A-Za-z\s]+$/', 'min:3', 'max:60'],
            'customer_code' => ['required', 'exists:tb_customer,customer_code']
        ]);
        CustomerModel::where('customer_code', $data['customer_code'])->update([ 'name' => $data['name'] ]);
        return response()->json(['message' => 'Customer name changed successfully'], 202, ['success' => 'Customer name changed successfully.']);
    }
}
