<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Lapangan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_lapangan', function (Blueprint $table) {
            $table->id();
            $table->string('label', 191)->unique();
            $table->string('image_path', 255);
            $table->text('deskripsi');
            $table->float('harga_normal');
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
        Schema::dropIfExists('tb_lapangan');
    }
}
