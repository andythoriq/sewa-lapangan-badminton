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
        Schema::create('tb_customer', function (Blueprint $table) {
            $table->string('customer_code', 20)->primary()->unique();
            $table->string('name', 191);
            $table->string('phone_number', 20)->unique();
            $table->float('deposit')->nullable()->default(null);
            $table->float('debt')->nullable()->default(null);
            $table->enum('status', ['M', 'R'])->comment('M: member, R: regular');
            $table->dateTime('member_active_period')->nullable()->default(null);
            $table->string('member_booking_code', 90)->nullable()->default(null);
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
        Schema::dropIfExists('tb_customer');
    }
}
