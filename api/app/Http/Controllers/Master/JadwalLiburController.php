<?php

namespace App\Http\Controllers\Master;

use Illuminate\Http\Request;
use App\Models\JadwalLiburModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\JadwalRequest;

class JadwalLiburController extends Controller
{
    public function index()
    {
        $jadwal = JadwalLiburModel::all();
        return response()->json($jadwal);
    }

    public function create(JadwalRequest $request)
    {
        $request->createJadwalLibur();
        return response(null, 201, ['success' => 'New jadwal libur created.']);
    }

    public function update(JadwalRequest $request, JadwalLiburModel $jadwal_libur)
    {
        $request->updateJadwalLibur($jadwal_libur);
        return response(null, 204, ['success' => 'Jadwal libur updated.']);
    }

    public function delete(JadwalLiburModel $jadwal_libur)
    {
        $jadwal_libur->deleteOrFail();
        return response(null, 204, ['success' => 'Jadwal libur deleted.']);
    }
}
