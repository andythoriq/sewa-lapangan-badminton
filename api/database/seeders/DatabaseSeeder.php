<?php

namespace Database\Seeders;

use App\Models\HolidayModel;
use App\Models\OpenTimeModel;
use App\Models\RentalModel;
use App\Models\PeakTimeModel;
use App\Models\CourtModel;
use App\Models\CustomerModel;
use App\Models\RoleModel;
use App\Models\TransactionModel;
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
        // RoleModel::factory(2)->has(User::factory(2)->has(RentalModel::factory(2), 'rentals'), 'users')->create();
        // CourtModel::factory()
        //     ->has(PeakTimeModel::factory(2), 'peak_times')
        //     ->has(RentalModel::factory(2), 'rentals')
        //     ->count(2)->create();
        // CustomerModel::factory()->has(RentalModel::factory()->count(2), 'rentals')->count(2)->create();


        OpenTimeModel::factory()->count(14)->create();
        HolidayModel::factory()->count(16)->create();
        // OpenTimeModel::insert([
        //     'start' => '08:00:00',
        //     'finish' => '09:00:00',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'start' => '09:00:00',
        //     'finish' => '10:00:00',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'start' => '10:00:00',
        //     'finish' => '11:00:00',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'start' => '11:00:00',
        //     'finish' => '12:00:00',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'start' => '12:00:00',
        //     'finish' => '13:00:00',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'start' => '13:00:00',
        //     'finish' => '14:00:00',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'start' => '14:00:00',
        //     'finish' => '15:00:00',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ]);

        CourtModel::factory(4)->has(PeakTimeModel::factory(2), 'peak_times')->create();
        TransactionModel::factory(8)->create();
        RoleModel::factory(2)->has(User::factory(4), 'users')->create();
        CustomerModel::factory(4)
        ->has(RentalModel::factory(2), 'rentals')->create();
    }
}
