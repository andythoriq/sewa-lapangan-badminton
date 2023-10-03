<?php

namespace App\Http\Controllers;

use App\Models\RentalModel;
use Illuminate\Http\Request;

class FinishRentalController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([

        ]);


        RentalModel::where('id', $data['id'])->update([
            'status' => 'F'
        ]);

        return response()->json(['message' => 'Rental finished'], 202, ['success' => 'Rental finished.']);
    }
}
