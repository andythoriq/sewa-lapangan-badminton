<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class JadwalSewa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_jadwal_sewa', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start');
            $table->dateTime('end');
            $table->enum('status', ['F', 'U'])->comment('F: Finished, U: Unfinished');
            $table->foreignId('lapangan_id')->constrained('tb_lapangan', 'id')->cascadeOnDelete();
            $table->foreignId('transaksi_id')->constrained('tb_transaksi', 'id')->cascadeOnDelete();
            $table->string('pelanggan_id', 20);
            $table->foreign('pelanggan_id')->references('code_pelanggan')->on('tb_pelanggan')->cascadeOnDelete();
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_jadwal_sewa');
    }
}
