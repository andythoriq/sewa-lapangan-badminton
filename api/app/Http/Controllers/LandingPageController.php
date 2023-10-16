<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use App\Models\CourtModel;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    public function __invoke(Request $request)
    {
        $courts = CourtModel::select(['id', 'label', 'initial_price', 'image_path', 'description'])
            ->get();

        $contact = ConfigModel::getContact();
        $gor_name = ConfigModel::getCompanyName();
        $contact['gor_name'] = $gor_name;

        return response()->json([
            'contact' => $contact,
            'courts' => $courts,
        ]);
    }
}
