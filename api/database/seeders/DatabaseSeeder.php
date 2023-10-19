<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\RoleModel;
use App\Models\CourtModel;
use App\Models\ConfigModel;
use App\Models\RentalModel;
use App\Models\HolidayModel;
use App\Models\CustomerModel;
use App\Models\OpenTimeModel;
use App\Models\PeakTimeModel;
use App\Traits\CustomerCodeFormat;
use Illuminate\Database\Seeder;
use App\Models\TransactionModel;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use CustomerCodeFormat;
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

        // HolidayModel::factory()->count(16)->create();
        // OpenTimeModel::insert([[
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
        // ]]);

        // CourtModel::factory(3)->has(PeakTimeModel::factory(2), 'peak_times')->create();
        // TransactionModel::factory(4)->create();
        // RoleModel::factory(3)->has(User::factory(4), 'users')->create();
        // CustomerModel::factory(3)
        // ->has(RentalModel::factory(3), 'rentals')->create();

        // OpenTimeModel::factory()->count(14)->create();
        DB::table('tb_holiday')->insert([
            [
                'label' => 'Hari libur nasional tahun baru',
                'date' => '2023-01-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Tahun baru imlek',
                'date' => '2023-01-22',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Tahun Baru Imlek',
                'date' => '2023-01-23',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Pers Nasional',
                'date' => '2023-02-09',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Isra Miraj Nabi Muhammad SAW',
                'date' => '2023-02-18',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Peringatan Peristiwa Serangan Umum 1 Maret',
                'date' => '2023-03-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Perempuan Internasional',
                'date' => '2023-03-08',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Suci Nyepi (Tahun Baru Saka) Day 1',
                'date' => '2023-03-22',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Hari Suci Nyepi Day 2, Ramadan Start',
                'date' => '2023-03-23',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Wafat Isa Almasih',
                'date' => '2023-04-07',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Paskah',
                'date' => '2023-04-09',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Peringatan Konferensi Asia-Afrika',
                'date' => '2023-04-18',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Idul Fitri Day 1',
                'date' => '2023-04-19',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Idul Fitri Day 2',
                'date' => '2023-04-20',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Kartini, Cuti Bersama Idul Fitri Day 3',
                'date' => '2023-04-21',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Idul Fitri Day 4, Cuti Bersama Lebaran, Hari Bumi',
                'date' => '2023-04-22',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Idul Fitri Day 5',
                'date' => '2023-04-23',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Idul Fitri Day 6',
                'date' => '2023-04-24',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Idul Fitri Day 7',
                'date' => '2023-04-25',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Buruh Internasional',
                'date' => '2023-05-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Pendidikan Nasional',
                'date' => '2023-05-02',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Kenaikan Isa Al Masih',
                'date' => '2023-05-18',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Kebangkitan Nasional',
                'date' => '2023-05-20',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Lahir Pancasila',
                'date' => '2023-06-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Hari Waisak',
                'date' => '2023-06-02',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Raya Waisak',
                'date' => '2023-06-04',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Idul Adha (Lebaran Haji)',
                'date' => '2023-06-29',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Satu Muharam / Tahun Baru Hijriah',
                'date' => '2023-07-19',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Anak Nasional',
                'date' => '2023-07-23',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Proklamasi Kemerdekaan R.I.',
                'date' => '2023-08-17',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Maulid Nabi Muhammad SAW',
                'date' => '2023-09-28',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Kesaktian Pancasila',
                'date' => '2023-10-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Batik Nasional',
                'date' => '2023-10-02',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Sumpah Pemuda',
                'date' => '2023-10-28',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Pahlawan',
                'date' => '2023-11-10',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Diwali',
                'date' => '2023-11-12',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Guru',
                'date' => '2023-11-25',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Ayah',
                'date' => '2023-12-12',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Ibu',
                'date' => '2023-12-22',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Malam Natal',
                'date' => '2023-12-24',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Raya Natal',
                'date' => '2023-12-25',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Natal',
                'date' => '2023-12-26',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Malam Tahun Baru',
                'date' => '2023-12-31',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Tahun Baru',
                'date' => '2024-01-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Isra Mikraj Nabi Muhammad',
                'date' => '2024-02-08',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Pers Nasional',
                'date' => '2024-02-09',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Tahun Baru Imlek',
                'date' => '2024-02-10',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Peringatan Peristiwa Serangan Umum 1 Maret',
                'date' => '2024-03-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Perempuan Internasional',
                'date' => '2024-03-08',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Suci Nyepi (Tahun Baru Saka)',
                'date' => '2024-03-11',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Ramadan Start',
                'date' => '2024-03-12',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Wafat Isa Almasih',
                'date' => '2024-03-29',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Paskah',
                'date' => '2024-03-31',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Raya Idul Fitri',
                'date' => '2024-04-09',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Idul Fitri Day 1',
                'date' => '2024-04-10',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Idul Fitri Day 2',
                'date' => '2024-04-11',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Peringatan Konferensi Asia-Afrika',
                'date' => '2024-04-18',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Kartini',
                'date' => '2024-04-21',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Bumi',
                'date' => '2024-04-22',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Buruh Internasional / Pekerja',
                'date' => '2024-05-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Pendidikan Nasional',
                'date' => '2024-05-02',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Kenaikan Isa Al Masih',
                'date' => '2024-05-09',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Kebangkitan Nasional',
                'date' => '2024-05-20',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Raya Waisak',
                'date' => '2024-05-23',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Lahir Pancasila',
                'date' => '2024-06-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Raya Idul Adha',
                'date' => '2024-06-17',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Satu Muharam / Tahun Baru Hijriah',
                'date' => '2024-07-07',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Tahun Baru Hijriyah',
                'date' => '2024-07-08',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Anak Nasional',
                'date' => '2024-07-23',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Proklamasi Kemerdekaan R.I.',
                'date' => '2024-08-17',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Maulid Nabi Muhammad SAW',
                'date' => '2024-09-15',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Kesaktian Pancasila',
                'date' => '2024-10-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Batik Nasional',
                'date' => '2024-10-02',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Sumpah Pemuda',
                'date' => '2024-10-28',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Diwali',
                'date' => '2024-11-01',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Pahlawan',
                'date' => '2024-11-10',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Guru',
                'date' => '2024-11-25',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Pencoblosan Pilkada Serentak',
                'date' => '2024-11-27',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Ayah',
                'date' => '2024-12-12',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Ibu',
                'date' => '2024-12-22',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Cuti Bersama Natal',
                'date' => '2024-12-24',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Hari Raya Natal',
                'date' => '2024-12-25',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Malam Tahun Baru',
                'date' => '2024-12-31',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
        // non unique holiday
        // HolidayModel::insert([[
        //     'label' => 'Hari libur nasional tahun baru',
        //     'date' => '2023-01-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Tahun baru imlek',
        //     'date' => '2023-01-22',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Tahun Baru Imlek',
        //     'date' => '2023-01-23',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Pers Nasional',
        //     'date' => '2023-02-09',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Isra Miraj Nabi Muhammad SAW',
        //     'date' => '2023-02-18',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Peringatan Peristiwa Serangan Umum 1 Maret',
        //     'date' => '2023-03-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Perempuan Internasional',
        //     'date' => '2023-03-08',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Suci Nyepi (Tahun Baru Saka) - Day 1',
        //     'date' => '2023-03-22',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Hari Suci Nyepi (Tahun Baru Saka) - Day 2',
        //     'date' => '2023-03-23',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Ramadan Start',
        //     'date' => '2023-03-23',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Wafat Isa Almasih',
        //     'date' => '2023-04-07',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Paskah',
        //     'date' => '2023-04-09',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Peringatan Konferensi Asia-Afrika',
        //     'date' => '2023-04-18',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Idul Fitri - Day 1',
        //     'date' => '2023-04-19',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Idul Fitri - Day 2',
        //     'date' => '2023-04-20',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Kartini',
        //     'date' => '2023-04-21',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Idul Fitri - Day - 3',
        //     'date' => '2023-04-21',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Idul Fitri - Day 4',
        //     'date' => '2023-04-22',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Lebaran',
        //     'date' => '2023-04-22',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Bumi',
        //     'date' => '2023-04-22',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Idul Fitri - Day 5',
        //     'date' => '2023-04-23',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Idul Fitri - Day 6',
        //     'date' => '2023-04-24',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Idul Fitri - Day 7',
        //     'date' => '2023-04-25',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Buruh Internasional / Pekerja',
        //     'date' => '2023-05-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Pendidikan Nasional',
        //     'date' => '2023-05-02',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Kenaikan Isa Al Masih',
        //     'date' => '2023-05-18',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Kebangkitan Nasional',
        //     'date' => '2023-05-20',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Lahir Pancasila',
        //     'date' => '2023-06-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Hari Waisak',
        //     'date' => '2023-06-02',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Raya Waisak',
        //     'date' => '2023-06-04',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Idul Adha (Lebaran Haji)',
        //     'date' => '2023-06-29',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Satu Muharam / Tahun Baru Hijriah',
        //     'date' => '2023-07-19',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Anak Nasional',
        //     'date' => '2023-07-23',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Proklamasi Kemerdekaan R.I.',
        //     'date' => '2023-08-17',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Maulid Nabi Muhammad SAW',
        //     'date' => '2023-09-28',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Kesaktian Pancasila',
        //     'date' => '2023-10-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Batik Nasional',
        //     'date' => '2023-10-02',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Sumpah Pemuda',
        //     'date' => '2023-10-28',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Pahlawan',
        //     'date' => '2023-11-10',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Diwali',
        //     'date' => '2023-11-12',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Guru',
        //     'date' => '2023-11-25',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Ayah',
        //     'date' => '2023-12-12',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Ibu',
        //     'date' => '2023-12-22',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Malam Natal',
        //     'date' => '2023-12-24',
        //     'created_at' => '',
        //     'updated_at' => ''
        // ], [
        //     'label' => 'Hari Raya Natal',
        //     'date' => '2023-12-25',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'label' => 'Cuti Bersama Natal',
        //     'date' => '2023-12-26',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'label' => 'Malam Tahun Baru',
        //     'date' => '2023-12-31',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'label' => 'Hari Tahun Baru',
        //     'date' => '2024-01-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'label' => 'Isra Mikraj Nabi Muhammad',
        //     'date' => '2024-02-08',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'label' => 'Hari Pers Nasional',
        //     'date' => '2024-02-09',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'label' => 'Tahun Baru Imlek',
        //     'date' => '2024-02-10',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'label' => 'Hari Peringatan Peristiwa Serangan Umum 1 Maret',
        //     'date' => '2024-03-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ], [
        //     'label' => 'Hari Perempuan Internasional',
        //     'date' => '2024-03-08',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Suci Nyepi (Tahun Baru Saka)',
        //     'date' => '2024-03-11',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Ramadan Start',
        //     'date' => '2024-03-12',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Wafat Isa Almasih',
        //     'date' => '2024-03-29',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Paskah',
        //     'date' => '2024-03-31',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Raya Idul Fitri',
        //     'date' => '2024-04-09',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Idul Fitri - Day 1',
        //     'date' => '2024-04-10',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Idul Fitri - Day 2',
        //     'date' => '2024-04-11',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Peringatan Konferensi Asia-Afrika',
        //     'date' => '2024-04-18',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Kartini',
        //     'date' => '2024-04-21',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Bumi',
        //     'date' => '2024-04-22',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Buruh Internasional / Pekerja',
        //     'date' => '2024-05-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Pendidikan Nasional',
        //     'date' => '2024-05-02',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Kenaikan Isa Al Masih',
        //     'date' => '2024-05-09',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Kebangkitan Nasional',
        //     'date' => '2024-05-20',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Raya Waisak',
        //     'date' => '2024-05-23',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Lahir Pancasila',
        //     'date' => '2024-06-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Raya Idul Adha',
        //     'date' => '2024-06-17',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Satu Muharam / Tahun Baru Hijriah',
        //     'date' => '2024-07-07',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Tahun Baru Hijriyah',
        //     'date' => '2024-07-08',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Anak Nasional',
        //     'date' => '2024-07-23',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Proklamasi Kemerdekaan R.I.',
        //     'date' => '2024-08-17',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Maulid Nabi Muhammad SAW',
        //     'date' => '2024-09-15',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Kesaktian Pancasila',
        //     'date' => '2024-10-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Batik Nasional',
        //     'date' => '2024-10-02',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Sumpah Pemuda',
        //     'date' => '2024-10-28',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Diwali',
        //     'date' => '2024-11-01',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Pahlawan',
        //     'date' => '2024-11-10',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Guru',
        //     'date' => '2024-11-25',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Pencoblosan Pilkada Serentak',
        //     'date' => '2024-11-27',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Ayah',
        //     'date' => '2024-12-12',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Ibu',
        //     'date' => '2024-12-22',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Cuti Bersama Natal',
        //     'date' => '2024-12-24',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Hari Raya Natal',
        //     'date' => '2024-12-25',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ],[
        //     'label' => 'Malam Tahun Baru',
        //     'date' => '2024-12-31',
        //     'created_at' => now(),
        //     'updated_at' => now()
        // ]]);

        CourtModel::insert([
            [
                'label' => 'Court A',
                'image_path' => null,
                'description' => 'A standard badminton court measures 20 feet in width for doubles matches and 17 feet for singles matches. The length of the court is 44 feet. The net divides the court into two equal halves, with a height of 5 feet 1 inch at the center.',
                'initial_price' => 40_000.00,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Court B',
                'image_path' => null,
                'description' => 'Badminton courts are typically surfaced with a non-slip material like wood or a synthetic surface. The playing surface should be flat, even, and free from any obstruction to ensure fair and safe gameplay. The outer boundary of the court is marked with lines, defining the in-bounds area.',
                'initial_price' => 50_000.00,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'label' => 'Court C',
                'image_path' => null,
                'description' => 'The net is placed in the center of the court, spanning the width. It is supported by two posts positioned at the doubles sidelines. The top of the net should be taut and aligned with the specified height. The net posts should be sturdy and securely anchored to the ground to maintain proper tension on the net.',
                'initial_price' => 55_000.00,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
        PeakTimeModel::insert([
            [
                'start' => '08:00:00',
                'finish' => '15:00:00',
                'price_increase' => 60_000.00,
                'day_name' => 'saturday',
                'court_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'start' => '08:00:00',
                'finish' => '15:00:00',
                'price_increase' => 65_000.00,
                'day_name' => 'monday',
                'court_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'start' => '08:00:00',
                'finish' => '16:00:00',
                'price_increase' => 60_000.00,
                'day_name' => 'sunday',
                'court_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        RoleModel::create([

            'label' => 'Admin',
            'menu' => "['/dashboard', '/create-booking', '/schedule', '/history-booking', '/scanner', '/verification', '/data-master/court', '/data-master/regular', '/data-master/member', '/data-master/holidays', '/data-master/calendar', '/data-master/peaktime', '/data-master/rush', '/user-management/user-list', '/user-management/user-role', '/setting']",
            'status' => 'Y'

        ]);
        User::create([

            'name' => 'Admin',
            'username' => 'admeen',
            'phone_number' => '087813052727',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'status' => 'Y',
            'role_id' => 1

        ]);
        ConfigModel::insert([
            [
          'slug'=> 'open_time',
          'description'=> 'Jam buka kami atau operational time adalah waktu kami untuk menerima pesanan booking selain dari waktu ini kami tidak menerima pesanan tersebut.',
          'value' => '[{"day":"monday","start":"08:00","finish":"17:00"},{"day":"tuesday","start":"09:00","finish":"17:00"},{"day":"wednesday","start":"09:00","finish":"18:00"}]'
        ],
        [
          'slug' => 'name',
          'description' => 'Nama perusahaan kami akan ditampilkan pada navbar dan tempat informasi yang lainnya.',
          'value' => 'BFB'
        ],
        [
          'slug' => 'contact',
          'description' => 'Berisikan nomor Whatsapp, Email, dan Alamat yang sedia untuk dihubungi.',
          'value' => '{"number":"080878786565","email":"bfb@bfb.com","address":"Jl Durian Runtuh"}'
        ],
        [
          'slug' => 'expire_duration',
          'description' => 'Expire duration OTP code in minutes after request it. (in minutes)',
          'value' => 9
        ],
        [
          'slug' =>  'member_discount',
          'description' => 'Potongan harga untuk booking member / multiple booking. (in percent)',
          'value' =>  10
        ],
        [
            'slug' => 'resend_limit',
            'descritpion' => 'Batasan ketika melakukan kirim ulang OTP code ke nomor pelanggan.',
            'value' => 4
        ]
        ]);
        CustomerModel::create([
            'customer_code' => $this->getFormattedCode(),
            'name' => 'Mr Regular',
            'phone_number' => '080878786565',
            'membership_status' => 'R',
            'status' => 'Y'
        ]);
    }
}
