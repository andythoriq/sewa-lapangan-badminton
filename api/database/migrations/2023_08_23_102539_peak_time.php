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
            $table->id();
            $table->time('start');
            $table->time('finish');
            $table->float('price_increase');
            $table->string('day_name', 20);
            $table->foreignId('court_id')->constrained('tb_court', 'id')->cascadeOnDelete();
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
