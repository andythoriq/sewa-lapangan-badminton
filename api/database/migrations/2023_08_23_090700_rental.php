<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Rental extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_rental', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('start');
            $table->dateTime('finish');
            $table->enum('status', ['B', 'O', 'F', 'C'])->comment('B: booked, O: onprogress, F: finished, C: canceled')->default('B');
            $table->float('price');
            $table->float('hour');

            $table->unsignedSmallInteger('court_id');
            $table->unsignedInteger('transaction_id');
            $table->unsignedInteger('user_id')->nullable()->default(null);
            $table->integer('customer_id');

            $table->foreign('court_id')->references('id')->on('tb_court')->cascadeOnDelete();
            $table->foreign('transaction_id')->references('id')->on('tb_transaction')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('customer_id')->references('customer_code')->on('tb_customer')->cascadeOnDelete();
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
        Schema::dropIfExists('tb_rental');
    }
}
