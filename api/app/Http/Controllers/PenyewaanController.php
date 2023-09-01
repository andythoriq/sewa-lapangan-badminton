<?php

namespace App\Http\Controllers;

use App\Http\Requests\PenyewaanRequest;
use Illuminate\Http\Request;

class PenyewaanController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(PenyewaanRequest $request)
    {
        $request->createMultipleRental();
        return response(null, 201, ['success' => 'Penyewaan done.']);
    }
}
