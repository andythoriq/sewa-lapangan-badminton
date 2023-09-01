<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\PeakTimeRequest;
use App\Http\Resources\Master\PeakTimeResource;
use App\Models\PeakTimeModel;

class PeakTimeController extends Controller
{
    public function index()
    {
        $peak_time = PeakTimeModel::select(['id', 'start', 'finish'])->get();
        return response()->json($peak_time);
    }

    public function show(PeakTimeModel $peak_time)
    {
        return new PeakTimeResource($peak_time->loadMissing('court:id,label,image_path,description,normal_price'));
    }

    public function create(PeakTimeRequest $request)
    {
        $request->createPeakTime();
        return response(null, 201, ['success' => 'New peak time created.']);
    }

    public function update(PeakTimeRequest $request, PeakTimeModel $peak_time)
    {
        $request->updatePeakTime($peak_time);
        return response(null, 204, ['success' => 'Peak time updated.']);
    }

    public function delete(PeakTimeModel $peak_time)
    {
        $peak_time->deleteOrFail();
        return response(null, 204, ['success' => 'Peak time updated.']);
    }
}
