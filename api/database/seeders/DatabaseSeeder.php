<?php

namespace Database\Seeders;

use App\Models\HolidayModel;
use App\Models\OpenTimeModel;
use App\Models\RentalModel;
use App\Models\PeakTimeModel;
use App\Models\CourtModel;
use App\Models\CustomerModel;
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
        HolidayModel::factory()->count(16)->create();
        // OpenTimeModel::factory()->count(14)->create();
        OpenTimeModel::insert([
            'start' => '08:00:00',
            'finish' => '09:00:00',
            'created_at' => now(),
            'updated_at' => now()
        ],[
            'start' => '09:00:00',
            'finish' => '10:00:00',
            'created_at' => now(),
            'updated_at' => now()
        ],[
            'start' => '10:00:00',
            'finish' => '11:00:00',
            'created_at' => now(),
            'updated_at' => now()
        ],[
            'start' => '11:00:00',
            'finish' => '12:00:00',
            'created_at' => now(),
            'updated_at' => now()
        ],[
            'start' => '12:00:00',
            'finish' => '13:00:00',
            'created_at' => now(),
            'updated_at' => now()
        ],[
            'start' => '13:00:00',
            'finish' => '14:00:00',
            'created_at' => now(),
            'updated_at' => now()
        ],[
            'start' => '14:00:00',
            'finish' => '15:00:00',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        CourtModel::factory()->has(PeakTimeModel::factory()->count(3), 'rentals')->count(3)->create();
        CustomerModel::factory()->count(35)->create();
    }
}
