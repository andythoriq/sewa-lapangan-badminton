<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\PeakTimeRequest;
use App\Http\Resources\Master\PeakTimeResource;
use App\Models\PeakTimeModel;
use Illuminate\Http\Request;

class PeakTimeController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->input('keyword');

        $peak_times = PeakTimeModel::when($keyword, function ($query) use ($keyword) {
            return $query->where('start', 'like', '%' . $keyword . '%')
                ->orWhere('finish', 'like', '%' . $keyword . '%')
                ->orWhere('day_name', 'like', '%' . $keyword . '%')
                ->orWhere('price_increase', 'like', '%' . $keyword . '%');
        })
            ->select(['id', 'start', 'finish', 'day_name', 'price_increase'])
            ->get();

        return response()->json($peak_times);
    }

    public function show(PeakTimeModel $peak_time)
    {
        return new PeakTimeResource($peak_time->loadMissing('court:id,label,image_path,description,initial_price'));
    }

    public function create(PeakTimeRequest $request)
    {
        $request->createPeakTime();
        return response()->json(['message' => 'Success create new peak time'], 201, ['success' => 'New peak time created.']);
    }

    public function update(PeakTimeRequest $request, PeakTimeModel $peak_time)
    {
        $request->updatePeakTime($peak_time);
        return response()->json(['message' => 'Success update peak time'], 202, ['success' => 'Peak time updated.']);
    }

    public function delete(PeakTimeModel $peak_time)
    {
        $peak_time->deleteOrFail();
        return response()->json(['message' => 'Success delete peak time'], 202, ['success' => 'Peak time updated.']);
    }

    public function create_multiple(PeakTimeRequest $request)
    {
        $request->createMultiplePeakTime();
        return response()->json(['message' => 'Success create new court'], 201, ['success' => 'Multiple peak time Created.']);
    }
}
