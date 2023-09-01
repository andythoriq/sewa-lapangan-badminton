<?php

namespace App\Http\Controllers\Master;

use App\Models\CloseDateModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\ScheduleRequest;

class CloseDateController extends Controller
{
    public function index()
    {
        $close_date = CloseDateModel::select(['id', 'label', 'start', 'finish'])->get();
        return response()->json($close_date);
    }

    public function create(ScheduleRequest $request)
    {
        $request->createCloseDate();
        return response(null, 201, ['success' => 'Created close time data.']);
    }

    public function update(ScheduleRequest $request, CloseDateModel $close_date)
    {
        $request->updateCloseDate($close_date);
        return response(null, 204, ['success' => 'Updated close time data.']);
    }

    public function delete(CloseDateModel $close_date)
    {
        $close_date->deleteOrFail();
        return response(null, 204, ['success' => 'Deleted close time data.']);
    }
}
