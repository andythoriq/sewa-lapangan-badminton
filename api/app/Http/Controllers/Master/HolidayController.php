<?php

namespace App\Http\Controllers\Master;

use App\Models\HolidayModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\HolidayRequest;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->input('keyword');

        $holidays = HolidayModel::when($keyword, function ($query) use ($keyword) {
            return $query->where('label', 'like', '%' . $keyword . '%')
                ->orWhere('date', 'like', '%' . $keyword . '%');
        })
            ->select(['id', 'label', 'date'])
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($holidays);
    }

    public function calendar()
    {
        $calendars = HolidayModel::select(['id', 'label AS title', 'date AS start'])
            ->orderBy('date', 'asc')
                ->get();
        $response = [
            'calendars'=>$calendars,
        ];
        if (idate('m') === 12) {
            $response['alert'] = [
                'title' => "it's December already",
                'message' => 'Time to add a new holiday schedule for the next year'
            ];
        }
        return response()->json($response);
    }

    public function create(HolidayRequest $request)
    {
        $id = $request->createHoliday();
        return response()->json(['message' => 'Holiday data is successfully inserted', 'id' => $id], 201, ['success' => 'Created holiday schedule.']);
    }

    public function update(HolidayRequest $request, HolidayModel $holiday)
    {
        $request->updateHoliday($holiday);
        return response()->json(['message' => 'Holiday data is successfully updated'], 202, ['success' => 'Updated holiday schedule.']);
    }

    public function delete(HolidayModel $holiday)
    {
        $holiday->deleteOrFail();
        return response()->json(['message' => 'Holiday data is successfully deleted.'], 202, ['success' => 'Deleted holiday schedule.']);
    }

    public function create_multiple(HolidayRequest $request)
    {
        $request->createMultipleHoliday();
        return response()->json(['message' => 'Success create holiday.'], 201, ['success' => 'Multiple holiday schedule created.']);
    }
}
