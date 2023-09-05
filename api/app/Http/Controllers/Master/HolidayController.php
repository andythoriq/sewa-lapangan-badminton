<?php

namespace App\Http\Controllers\Master;

use App\Models\HolidayModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\HolidayRequest;

class HolidayController extends Controller
{
    public function index()
    {
        $holiday = HolidayModel::select(['id', 'label', 'start', 'finish'])->get();
        return response()->json($holiday);
    }

    public function create(HolidayRequest $request)
    {
        $request->createHoliday();
        return response(null, 201, ['success' => 'Created holiday schedule.']);
    }

    public function update(HolidayRequest $request, HolidayModel $holiday)
    {
        $request->updateHoliday($holiday);
        return response(null, 204, ['success' => 'Updated holiday schedule.']);
    }

    public function delete(HolidayModel $holiday)
    {
        $holiday->deleteOrFail();
        return response(null, 204, ['success' => 'Deleted holiday schedule.']);
    }

    public function create_multiple(HolidayRequest $request)
    {
        $request->createMultipleHoliday();
        return response(null, 201, ['success' => 'Multiple holiday schedule created.']);
    }
}