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
        Schema::create('tb_rental', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start');
            $table->dateTime('finish');
            $table->enum('status', ['F', 'U'])->comment('F: Finished, U: Unfinished');
            $table->float('price');
            $table->foreignId('court_id')->constrained('tb_court', 'id')->cascadeOnDelete();
            $table->foreignId('transaction_id')->nullable()->constrained('tb_transaction', 'id')->cascadeOnDelete();
            $table->string('customer_id', 20);
            $table->foreign('customer_id')->references('customer_code')->on('tb_customer')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users', 'id')->cascadeOnDelete();
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