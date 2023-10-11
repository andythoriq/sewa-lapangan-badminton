<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OtpHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_otp_history', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('customer_id');
            $table->foreign('customer_id')->references('customer_code')->on('tb_customer')->cascadeOnDelete();
            $table->string('otp_code', 8);

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
        Schema::dropIfExists('tb_otp_history');
    }
}
