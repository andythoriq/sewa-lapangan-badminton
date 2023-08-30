<?php

namespace App\Http\Controllers;

use App\Models\JadwalSewaModel;
use Illuminate\Http\Request;

class PenyewaanController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $test = new JadwalSewaModel();
        return new JadwalSewaRequest();
    }
}
