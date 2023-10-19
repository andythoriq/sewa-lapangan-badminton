<?php

namespace App\Http\Controllers;

use App\Models\NotificationModel;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = NotificationModel::select(['id', 'label', 'value', 'read_status', 'created_at'])
                                        ->whereDate('created_at', Carbon::now('Asia/Jakarta')->format('Y-m-d'))
                                        ->orderBy('created_at', 'desc')
                                        ->get();
        $unread = NotificationModel::where('read_status', 'N')->whereDate('created_at', Carbon::now('Asia/Jakarta')->format('Y-m-d'))->count();
        return response()->json([
            'total_unread' => $unread,
            'notifications' => $notifications
        ]);
    }

    public function change(Request $request)
    {
        NotificationModel::where('id', $request->id)->update(['read_status' => 'Y']);
        return response()->json(null, 204);
    }
}
