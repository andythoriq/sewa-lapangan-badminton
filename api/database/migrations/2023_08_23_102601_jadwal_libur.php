<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class JadwalLibur extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_jadwal_libur', function (Blueprint $table) {
            $table->id();
            $table->string('label', 191);
            $table->dateTime('start')->default('2000-01-01 00:00:00');
            $table->dateTime('end')->default('2000-01-01 00:00:00');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_jadwal_libur');
    }
}
