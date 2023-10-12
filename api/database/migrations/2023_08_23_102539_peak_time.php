<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PeakTime extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_peak_time', function (Blueprint $table) {
            $table->increments('id');
            $table->time('start');
            $table->time('finish');
            $table->float('price_increase');
            $table->string('day_name', 16);

            $table->unsignedSmallInteger('court_id');
            $table->foreign('court_id')->references('id')->on('tb_court')->cascadeOnDelete();

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
        Schema::dropIfExists('tb_peak_time');
    }
}
