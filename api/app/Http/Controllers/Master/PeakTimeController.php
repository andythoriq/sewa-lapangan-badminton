<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\PeakTimeRequest;
use App\Http\Resources\Master\PeakTimeResource;
use App\Http\Resources\PeakTimeCollection;
use App\Models\PeakTimeModel;
use Illuminate\Http\Request;

class PeakTimeController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->input('keyword');

        $peak_times = PeakTimeModel::when($keyword, function ($query) use ($keyword) {
            $query->where(function ($q) use ($keyword) {
                return $q->where('start', 'like', '%' . $keyword . '%')
                ->orWhere('finish', 'like', '%' . $keyword . '%')
                ->orWhere('day_name', 'like', '%' . $keyword . '%')
                ->orWhere('price_increase', 'like', '%' . $keyword . '%')
                ->orWhereHas('court', function($court) use ($keyword) {
                    $court->where('label', 'like', '%' . $keyword . '%')
                        ->orWhere('initial_price', 'like', '%' . $keyword . '%');
                });
            });
        })
            ->with('court:id,label,initial_price')
            ->select(['id', 'start', 'finish', 'day_name', 'price_increase', 'court_id'])
            ->paginate(10);

        return new PeakTimeCollection($peak_times);
    }

    public function show(PeakTimeModel $peak_time)
    {
        return new PeakTimeResource($peak_time->loadMissing('court:id,label,image_path,description,initial_price'));
    }

    public function edit(PeakTimeModel $peak_time)
    {
        $peak_time->loadMissing('court:id,initial_price');
        return response()->json([
            'start' => $peak_time->start,
            'finish' => $peak_time->finish,
            'court_id' => $peak_time->court_id,
            'price_increase' => $peak_time->price_increase,
            'day_name' => $peak_time->day_name,
            'initial_price' => $peak_time->court->initial_price
        ]);
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
