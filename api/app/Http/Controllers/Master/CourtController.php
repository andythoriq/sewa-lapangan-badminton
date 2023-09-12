<?php

namespace App\Http\Controllers\Master;

use App\Models\CourtModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\CourtRequest;
use App\Http\Resources\Master\CourtResource;
use App\Http\Resources\Master\CourtCollection;

class CourtController extends Controller
{
    public function index()
    {
        $courts = CourtModel::select(['id', 'label', 'image_path', 'initial_price'])->get();
        return new CourtCollection($courts);
    }

    public function show(CourtModel $court)
    {
        return new CourtResource($court->loadMissing(['rentals', 'peak_times']));
    }

    public function create(CourtRequest $request)
    {
        $request->createCourt();
        return response(null, 201, ['success' => 'New court data created.']);
    }

    public function update(CourtRequest $request, CourtModel $court)
    {
        $request->updateCourt($court);
        return response(null, 204, ['success' => 'Court data updated.']);
    }

    public function delete(CourtModel $court)
    {
        $court->deleteOrFail();
        return response(null, 204, ['success' => 'Court data deleted.']);
    }
}
