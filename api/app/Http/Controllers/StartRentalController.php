<?php

namespace App\Http\Controllers;

use App\Models\RentalModel;
use Illuminate\Http\Request;

class StartRentalController extends Controller
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
            'id' => ['required', 'exists:tb_rental,id']
        ]);

        $id = $data['id'];

        RentalModel::where('id', $id)->where('status', 'B')->update([
            'status' => 'O'
        ]);

        return response()->json(['message' => 'Rental is on progress'], 202, ['success' => 'Rental is on progress.']);
    }
}
