<?php

use App\Http\Controllers\Master\{AuthController, JadwalLiburController, LapanganController, PelangganController, UserController, UserRoleController, JadwalSewaController};
use App\Http\Controllers\PenyewaanController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    /** AUTH ROUTES  */
    Route::post('/login', [AuthController::class, 'login'])->name('login')->withoutMiddleware('auth:sanctum');
    Route::post('/register', [AuthController::class, 'register'])->name('register')->withoutMiddleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    /** User Role
     * role/policy: role-handle, user-handle, admin, can't delete&update super admin */
    Route::get('/role', [UserRoleController::class, 'index']);
    Route::get('/role/{role}', [UserRoleController::class, 'show']);
    Route::post('/role', [UserRoleController::class, 'create']);
    Route::put('/role/{role}', [UserRoleController::class, 'update']);
    Route::delete('/role/{role}', [UserRoleController::class, 'delete']);

    /** USER MANAGEMENT
     * role/policy: user-handle, admin */
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{user}', [UserController::class, 'show']);
    Route::post('/user', [UserController::class, 'create'])->name('create-user');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('update-user');
    Route::delete('/user/{user}', [UserController::class, 'delete']);

    /** Master Jadwal Libur
     * role/policy: jadwal-handle, jadwal-libur-handle, admin */
    Route::get('/jadwal-libur', [JadwalLiburController::class, 'index']);
    Route::post('/jadwal-libur', [JadwalLiburController::class, 'create']);
    Route::put('/jadwal-libur/{jadwal_libur}', [JadwalLiburController::class, 'update']);
    Route::delete('/jadwal-libur/{jadwal_libur}', [JadwalLiburController::class, 'delete']);

    /** Master Lapangan
     * role/policy: lapangan-handle, admin */
    Route::get('/lapangan', [LapanganController::class, 'index']);
    Route::get('/lapangan/{lapangan}', [LapanganController::class, 'show']);
    Route::post('/lapangan', [LapanganController::class, 'create']);
    Route::put('/lapangan/{lapangan}', [LapanganController::class, 'update']);
    Route::delete('/lapangan/{lapangan}', [LapanganController::class, 'delete']);

    /** PELANGGAN
     * role/policy: pelanggan-handle, pelanggan-regular-handle, pelanggan-member-handle, admin */
    Route::prefix('/pelanggan/member')->group(function(){
        Route::get('/', [PelangganController::class, 'index_M']);
        Route::get('/{pelanggan}', [PelangganController::class, 'show_M']);
        Route::post('/', [PelangganController::class, 'create_M']);
        Route::put('/{pelanggan}', [PelangganController::class, 'update_M']);
        Route::delete('/{pelanggan}', [PelangganController::class, 'delete_M']);
    });
    Route::prefix('/pelanggan/regular')->group(function () {
        Route::get('/', [PelangganController::class, 'index_R']);
        Route::get('/{pelanggan}', [PelangganController::class, 'show_R']);
        Route::post('/', [PelangganController::class, 'create_R']);
        Route::put('/{pelanggan}', [PelangganController::class, 'update_R']);
        Route::delete('/{pelanggan}', [PelangganController::class, 'delete_R']);
    });

    /** Jadwal Sewa
     * role/policy: pelanggan-handle, jadwal-handle, jadwal-sewa-handle, admin */
    Route::get('/jadwal-sewa', [JadwalSewaController::class, 'index']);
    Route::get('/jadwal-sewa/{jadwal_sewa}', [JadwalSewaController::class, 'show']);
    Route::put('/jadwal-sewa/{jadwal_sewa}', [JadwalSewaController::class, 'update']);
    Route::delete('/jadwal-sewa/{jadwal_sewa}', [JadwalSewaController::class, 'delete']);

    /** Transaksi
     * role/policy: transaksi-handle, admin */


    /**
     * Penyewaan / Create Jadwal Sewa
     */
    Route::post('/penyewaan', PenyewaanController::class);


    /**
     * Transaksi / Create Transaksi
     */

});
