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
            $table->string('code_pelanggan', 20)->primary();
            $table->string('nama', 191);
            $table->string('no_telp', 20)->unique();
            $table->float('deposit');
            $table->float('hutang');
            $table->enum('status', ['M', 'R'])->comment('M: member, R: regular');
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
