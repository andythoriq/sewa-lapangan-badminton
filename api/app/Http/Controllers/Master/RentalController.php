<?php

namespace App\Http\Controllers\Master;

use App\Models\NotificationModel;
use App\Models\RentalModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\RentalRequest;
use App\Http\Resources\Master\RentalResource;
use App\Http\Resources\Master\RentalCollection;

class RentalController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->input('keyword');

        $rentals = RentalModel::when($keyword, function ($query) use ($keyword) {
            $query->where(function ($q) use ($keyword) {
                return $q->where('start', 'like', '%' . $keyword . '%')
                    ->orWhere('finish', 'like', '%' . $keyword . '%')
                    ->orWhereHas('customer', function ($customer) use ($keyword) {
                        $customer->where('name', 'like', '%' . $keyword . '%')
                            ->orWhere('phone_number', 'like', '%' . $keyword . '%');
                    })
                    ->orWhereHas('court', function ($court) use ($keyword) {
                        $court->where('label', 'like', '%' . $keyword . '%')
                            ->orWhere('initial_price', 'like', '%' . $keyword . '%');
                    })
                    ->orWhereHas('transaction', function ($transaction) use ($keyword) {
                        $transaction->where('booking_code', 'like', '%' . $keyword . '%');
                    });
            });
        })
            ->where('status', '!=', 'C')
            ->select(['id', 'start', 'finish', 'price', 'status', 'transaction_id', 'customer_id', 'court_id'])
            ->whereHas('transaction', function($trx) {
                $trx->where('isPaid', 'N')->where('isDebt', 'N')->where('isDeposit', 'N');
            })
            ->with([
                'transaction:id,total_price,total_hour,booking_code',
                'customer:customer_code,name,phone_number',
                'court:id,label,initial_price'
            ])
            ->orderBy("updated_at", "desc")
            ->paginate(10);
        return new RentalCollection($rentals);
    }

    public function show(RentalModel $rental)
    {
        return new RentalResource($rental->loadMissing(['court', 'transaction', 'customer', 'user:id,name,phone_number,status,role_id', 'user.role:id,label,menu,status']));
    }

    public function create(RentalRequest $request)
    {
        $response = $request->createRental();
        return response()->json([
            'message' => 'Booked successfully',
            'transaction' => [
                'booking_code' => $response['bc'],
                'total_hour' => $response['th'],
                'total_price' => $response['tp'],
                'qr_code_image' => $response['qr'],
                'phone_number' => $response['pn']
            ]
        ], 201, ['success' => 'Created New Rental data.']);
    }

    public function update(RentalRequest $request, RentalModel $rental)
    {
        $request->updateRental($rental);
        return response()->json(['message' => 'Rental / booking data updated'], 204, ['success' => 'Rental data updated.']);
    }

    public function delete(RentalModel $rental)
    {
        $rental->deleteOrFail();
        return response()->json(['message' => 'Rental / booking data deleted'], 204, ['success' => 'Rental data deleted.']);
    }

    public function create_multiple(RentalRequest $request)
    {
        $response = $request->createMultipleRental();
        return response()->json([
            'message' => 'Multiple booked successfully',
            'transaction' => [
                'booking_code' => $response['bc'],
                'total_hour' => $response['th'],
                'total_price' => $response['tp'],
                'qr_code_image' => $response['qr'],
                'phone_number' => $response['pn']
            ]
        ], 201, ['success' => 'Multiple rental Created.']);
    }
}
