<?php

namespace Database\Seeders;

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
        RoleModel::factory()->has(User::factory()->count(10))->count(1)->create();
    }
}
