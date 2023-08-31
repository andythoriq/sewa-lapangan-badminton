<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\JadwalSewaRequest;
use App\Models\JadwalSewaModel;
use Illuminate\Http\Request;

class JadwalSewaController extends Controller
{
    public function index()
    {

    }

    public function show(JadwalSewaModel $jadwal_sewa)
    {

    }

    public function create(JadwalSewaRequest $request)
    {
        $request->createJadwalSewa();
        return response(null, 201, ['success' => 'Penyewaan done.']);
    }

    public function update(JadwalSewaRequest $request, JadwalSewaModel $jadwal_sewa)
    {

    }

    public function delete(JadwalSewaModel $jadwal_sewa)
    {

    }
}
