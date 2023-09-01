<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\RentalRequest;
use App\Http\Resources\Master\RentalResource;
use App\Models\RentalModel;

class RentalController extends Controller
{
    public function index()
    {
        $rental = RentalModel::select(['id', 'start', 'finish', 'price', 'status'])->get();
        return response()->json($rental);
    }

    public function show(RentalModel $rental)
    {
        return new RentalResource($rental);
    }

    public function create(RentalRequest $request)
    {
        $request->Rental();
        return response(null, 201, ['success' => 'Created New Rental data.']);
    }

    public function update(RentalRequest $request, RentalModel $rental)
    {
        $request->Rental($rental);
        return response(null, 204, ['success' => 'Rental data updated.']);
    }

    public function delete(RentalModel $rental)
    {
        $rental->delete();
        return response(null, 204, ['success' => 'Rental data deleted.']);
    }

    public function create_multiple(RentalRequest $request)
    {
        $request->createMultipleRental();
        return response(null, 201, ['success' => 'Multiple rental Created.']);
    }
}
