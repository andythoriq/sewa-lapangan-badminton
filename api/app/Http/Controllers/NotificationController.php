<?php

namespace App\Http\Controllers;

use App\Models\NotificationModel;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = NotificationModel::select('id', 'label', 'value', 'read_status', 'created_at')->where('read_status', 'N')->get();
        return response()->json($notifications);
    }

    public function change(Request $request)
    {

    }
}
