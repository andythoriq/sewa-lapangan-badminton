<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\JadwalRequest;
use App\Http\Resources\Master\JadwalSibukCollection;
use App\Http\Resources\Master\JadwalSibukResource;
use App\Models\JadwalSibukModel;
use Illuminate\Http\Request;

class JadwalSibukController extends Controller
{
    public function index()
    {
        $jadwal = JadwalSibukModel::select(['id', 'start', 'end'])->get();
        return new JadwalSibukCollection($jadwal);
    }

    public function show(JadwalSibukModel $jadwal_sibuk)
    {
        return new JadwalSibukResource($jadwal_sibuk->loadMissing('lapangan:id,label,image_path,deskripsi,harga_normal'));
    }

    public function create(JadwalRequest $request)
    {
        $request->createJadwalSibuk();
        return response(null, 201, ['success' => 'New jadwal sibuk created.']);
    }

    public function update(JadwalRequest $request, JadwalSibukModel $jadwal_sibuk)
    {
        $request->updateJadwalSibuk($jadwal_sibuk);
        return response(null, 204, ['success' => 'Jadwal sibuk updated.']);
    }

    public function delete(JadwalSibukModel $jadwal_sibuk)
    {
        $jadwal_sibuk->deleteOrFail();
        return response(null, 204, ['success' => 'Jadwal sibuk updated.']);
    }
}
