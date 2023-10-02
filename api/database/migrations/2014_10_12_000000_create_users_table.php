<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 60);
            // $table->string('email')->unique();
            $table->string('username', 20)->unique();
            $table->string('phone_number', 20)->unique();
            $table->enum('status', ['Y', 'N'])->comment('Y: Active, N: Inactive')->default('Y');
            // $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();

            $table->unsignedSmallInteger('role_id')->nullable();
            $table->foreign('role_id')->references('id')->on('tb_role')->nullOnDelete();

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
        Schema::dropIfExists('users');
    }
}
