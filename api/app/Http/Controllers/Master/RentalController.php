<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\RentalRequest;
use App\Http\Resources\Master\RentalCollection;
use App\Http\Resources\Master\RentalResource;
use App\Models\RentalModel;

class RentalController extends Controller
{
    public function index()
    {
        $rentals = RentalModel::select(['id', 'start', 'finish', 'price', 'status'])->get();
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
                'phone_number' => $response['pn']
            ]
        ], 201, ['success' => 'Created New Rental data.']);
    }

    public function update(RentalRequest $request, RentalModel $rental)
    {
        $request->updateRental($rental);
        return response(null, 204, ['success' => 'Rental data updated.']);
    }

    public function delete(RentalModel $rental)
    {
        $rental->deleteOrFail();
        return response(null, 204, ['success' => 'Rental data deleted.']);
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
                'phone_number' => $response['pn']
            ]
        ], 201, ['success' => 'Multiple rental Created.']);
    }
}
