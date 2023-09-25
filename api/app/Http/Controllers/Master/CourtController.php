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
        $courts = CourtModel::select(['id', 'label', 'initial_price', 'image_path', 'description'])->get();
        return new CourtCollection($courts);
    }

    public function show(CourtModel $court)
    {
        return new CourtResource($court->loadMissing(['rentals', 'peak_times']));
    }

    public function edit(CourtModel $court)
    {
        return response()->json($court->only(['label', 'initial_price', 'description', 'image_path']));
    }

    public function create(CourtRequest $request)
    {
        $request->createCourt();
        return response()->json(['message' => 'Success create new court'], 201, ['success' => 'New court data created.']);
    }

    public function update(CourtRequest $request, CourtModel $court)
    {
        $request->updateCourt($court);
        return response()->json(['message' => 'Success update court'], 202, ['success' => 'Court data updated.']);
    }

    public function delete(CourtModel $court)
    {
        $court->deleteOrFail();
        return response()->json(['message' => 'Success delete court'], 202, ['success' => 'Court data deleted.']);
    }
}
