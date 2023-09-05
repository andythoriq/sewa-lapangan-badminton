<?php

namespace App\Http\Controllers\Master;

use App\Models\CloseTimeModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\CloseTimeRequest;

class CloseTimeController extends Controller
{
    public function index()
    {
        $close_time = CloseTimeModel::select(['id', 'label', 'start', 'finish'])->get();
        return response()->json($close_time);
    }

    public function create(CloseTimeRequest $request)
    {
        $request->createCloseTime();
        return response(null, 201, ['success' => 'Created close time data.']);
    }

    public function update(CloseTimeRequest $request, CloseTimeModel $close_time)
    {
        $request->updateCloseTime($close_time);
        return response(null, 204, ['success' => 'Updated close time data.']);
    }

    public function delete(CloseTimeModel $close_time)
    {
        $close_time->deleteOrFail();
        return response(null, 204, ['success' => 'Deleted close time data.']);
    }

    public function create_multiple(CloseTimeRequest $request)
    {
        $request->createMultipleCloseTime();
        return response(null, 201, ['success' => 'Multiple close time created.']);
    }
}