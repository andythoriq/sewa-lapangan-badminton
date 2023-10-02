<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class getUserTypeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $type = 'user';
        if ($request->user() === auth()->user() || auth()->user() instanceof \App\Models\User) {
            $type = 'admin';
        } else if($request->user('customers') === auth()->user() || auth()->user() instanceof \App\Models\CustomerModel) {
            $type = 'user';
        }
        return response($type);
    }
}
