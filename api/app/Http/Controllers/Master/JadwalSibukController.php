<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\JadwalRequest;
use App\Models\JadwalSibukModel;
use Illuminate\Http\Request;

class JadwalSibukController extends Controller
{
    public function index()
    {

    }

    public function show()
    {

    }

    public function create(JadwalRequest $request)
    {

        return response(null, 201, ['success' => 'New jadwal sibuk created.']);
    }

    public function update(JadwalRequest $request, JadwalSibukModel $jadwal_sibuk)
    {

        return response(null, 204, ['success' => 'Jadwal sibuk updated.']);
    }

    public function delete(JadwalSibukModel $jadwal_sibuk)
    {
        $jadwal_sibuk->deleteOrFail();
        return response(null, 204, ['success' => 'Jadwal sibuk updated.']);
    }
}
