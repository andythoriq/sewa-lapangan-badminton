<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Customer extends Migration
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
            $table->string('name', 90);
            $table->string('phone_number', 20)->unique();
            $table->float('deposit')->nullable()->default(null);
            $table->float('debt')->nullable()->default(null);
            $table->enum('membership_status', ['M', 'R'])->comment('M: member, R: regular')->default('R');
            $table->enum('status', ['Y', 'N'])->comment('Y: Active, N: Inactive')->default('Y');
            $table->dateTime('member_active_period')->nullable()->default(null);
            $table->string('otp_code')->nullable()->default(null)->unique();
            $table->dateTime('expiration')->nullable()->default(null);
            // $table->string('password')->nullable()->default(null);
            $table->rememberToken();
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
