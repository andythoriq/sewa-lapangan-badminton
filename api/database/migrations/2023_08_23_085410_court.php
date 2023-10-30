<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Court extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_court', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('label', 64)->unique();
            $table->enum('status', ['Y', 'N'])->default('Y');
            $table->string('image_path', 254)->nullable()->default(null);
            $table->text('description');
            $table->float('initial_price');
            // $table->float('per_30_mnt_price');
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
        Schema::dropIfExists('tb_court');
    }
}
