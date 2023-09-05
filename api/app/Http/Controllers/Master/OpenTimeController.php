<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\OpenTimeRequest;
use App\Models\OpenTimeModel;

class OpenTimeController extends Controller
{
    public function index()
    {
        $open_time = OpenTimeModel::select(['id', 'start', 'finish'])->get();
        return response()->json($open_time);
    }

    public function create(OpenTimeRequest $request)
    {
        $request->createOpenTime();
        return response(null, 201, ['success' => 'Open time created.']);
    }

    public function update(OpenTimeRequest $request, OpenTimeModel $open_time)
    {
        $request->updateOpenTime($open_time);
        return response(null, 204, ['success' => 'Open time updated.']);
    }

    public function delete(OpenTimeModel $open_time)
    {
        $open_time->deleteOrFail();
        return response(null, 204, ['success' => 'Open time deleted.']);
    }
}
