<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\JadwalSewaRequest;
use App\Http\Resources\Master\JadwalSewaResource;
use App\Models\JadwalSewaModel;
use Illuminate\Http\Request;

class JadwalSewaController extends Controller
{
    public function index()
    {
        $jadwal = JadwalSewaModel::select(['id', 'start', 'end', 'status'])->get();
        return response()->json($jadwal);
    }

    public function show(JadwalSewaModel $jadwal_sewa)
    {
        return new JadwalSewaResource($jadwal_sewa);
    }

    public function create(JadwalSewaRequest $request)
    {
        $request->createJadwalSewa();
        return response(null, 201, ['success' => 'Created New Jadwal Sewa data.']);
    }

    public function update(JadwalSewaRequest $request, JadwalSewaModel $jadwal_sewa)
    {
        $request->updateJadwalSewa($jadwal_sewa);
        return response(null, 204, ['success' => 'Jadwal Sewa data updated.']);
    }

    public function delete(JadwalSewaModel $jadwal_sewa)
    {
        $jadwal_sewa->delete();
        return response(null, 204, ['success' => 'Jadwal Sewa data deleted.']);
    }
}
