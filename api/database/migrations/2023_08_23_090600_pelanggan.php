<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Pelanggan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_pelanggan', function (Blueprint $table) {
            $table->string('code_pelanggan', 20)->primary()->unique();
            $table->string('nama', 191);
            $table->string('no_telp', 20)->unique();
            $table->float('deposit')->nullable()->default(null);
            $table->float('hutang')->nullable()->default(null);
            $table->enum('status', ['M', 'R'])->comment('M: member, R: regular');
            $table->dateTime('masa_aktif_member')->nullable()->default(null);
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
        Schema::dropIfExists('tb_pelanggan');
    }
}
