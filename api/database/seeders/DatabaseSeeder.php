<?php

namespace Database\Seeders;

use App\Models\JadwalLiburModel;
use App\Models\JadwalSewaModel;
use App\Models\JadwalSibukModel;
use App\Models\LapanganModel;
use App\Models\PelangganModel;
use App\Models\RoleModel;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory()->has(RoleModel::factory()->count(1))->count(10)->create();
        RoleModel::factory(3)->has(User::factory(3))->create();
        JadwalLiburModel::factory()->count(16)->create();
        LapanganModel::factory()->has(JadwalSibukModel::factory()->count(3), 'rentals')->count(3)->create();
        PelangganModel::factory()->count(35)->create();
        // JadwalSewaModel
    }
}
