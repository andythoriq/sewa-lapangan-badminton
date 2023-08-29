<?php

namespace App\Http\Controllers;

use App\Http\Requests\LapanganRequest;
use App\Http\Resources\LapanganCollection;
use App\Http\Resources\LapanganResource;
use App\Models\LapanganModel;
use Illuminate\Http\Request;

class LapanganController extends Controller
{
    public function index()
    {
        $lapangan = LapanganModel::select(['id', 'label', 'image_path', 'harga_normal'])->get();
        return new LapanganCollection($lapangan);
    }

    public function show(LapanganModel $lapangan)
    {
        return new LapanganResource($lapangan->loadMissing(['rentals', 'peak_times']));
    }

    public function create(LapanganRequest $request)
    {
        $request->createLapangan();
        return response(null, 201, ['success' => 'New lapangan data created.']);
    }

    public function update(LapanganRequest $request, LapanganModel $lapangan)
    {
        $request->updateLapangan($lapangan);
        return response(null, 204, ['success' => 'Lapangan updated.']);
    }

    public function delete()
    {
        dd('delete');
        return response(null, 204, ['success' => 'Lapangan deleted.']);
    }
}
