<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JadwalLiburModel;
use App\Http\Requests\JadwalRequest;

class JadwalLiburController extends Controller
{
    public function index()
    {
        $jadwal = JadwalLiburModel::all();
        return response()->json(['jadwal' => $jadwal]);
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
