<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class JadwalSibuk extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_jadwal_sibuk', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start')->default('2000-01-01 00:00:00');
            $table->dateTime('end')->default('2000-01-01 00:00:00');
            $table->foreignId('lapangan_id')->constrained('tb_lapangan', 'id')->cascadeOnDelete();
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
        Schema::dropIfExists('tb_jadwal_sibuk');
    }
}
