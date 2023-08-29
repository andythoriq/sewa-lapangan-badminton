<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\PelangganRequest;
use App\Http\Resources\PelangganCollection;
use App\Http\Resources\PelangganResource;
use App\Models\PelangganModel;
use Illuminate\Http\Request;

class PelangganController extends Controller
{
    public function index_M()
    {
        $member = PelangganModel::select([
            'code_pelanggan',
            'nama',
            'deposit',
            'hutang',
            'masa_aktif_member'
        ])->where('status', 'M')
            ->orWhere('status', 'm')
            ->get();
        return new PelangganCollection($member);
    }

    public function index_R()
    {
        $regular = PelangganModel::select([
            'code_pelanggan',
            'nama',
            'deposit',
            'hutang'
        ])->where('status', 'R')
            ->orWhere('status', 'r')
            ->get();
        return new PelangganCollection($regular);
    }

    public function show_M(PelangganModel $pelanggan)
    {
        return new PelangganResource($pelanggan->loadMissing('rentals'));
    }

    public function show_R(PelangganModel $pelanggan)
    {
        return new PelangganResource($pelanggan->loadMissing('rentals'));
    }

    public function create_M(PelangganRequest $request)
    {
        $request->createMember();
        return response(null, 201, ['success' => 'New pelanggan member created.']);
    }

    public function create_R(PelangganRequest $request)
    {
        $request->createRegular();
        return response(null, 201, ['success' => 'New pelanggan regular created.']);
    }

    public function update_M(PelangganRequest $request, PelangganModel $pelanggan)
    {
        $request->updatePelanggan($pelanggan);
        return response(null, 204, ['success' => 'Pelanggan member updated.']);
    }

    public function update_R(PelangganRequest $request, PelangganModel $pelanggan)
    {
        $request->updatePelanggan($pelanggan);
        return response(null, 204, ['success' => 'Pelanggan regular updated.']);
    }

    public function delete_M(PelangganModel $pelanggan)
    {
        $pelanggan->deleteOrFail();
        return response(null, 204, ['success' => 'Pelanggan member deleted.']);
    }

    public function delete_R(PelangganModel $pelanggan)
    {
        $pelanggan->deleteOrFail();
        return response(null, 204, ['success' => 'Pelanggan regular deleted.']);
    }
}
