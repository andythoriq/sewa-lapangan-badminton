<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Transaction extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_transaction', function (Blueprint $table) {
            $table->id();
            $table->float('total_price');
            $table->float('total_hour');
            $table->string('qr_code_image', 255)->nullable()->default(null);
            $table->enum('isPaid', ['Y', 'N'])->default('N');
            $table->float('customer_paid')->nullable()->default(null);
            $table->string('booking_code', 191)->unique();
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
        Schema::dropIfExists('tb_transaction');
    }
}
