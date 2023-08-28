<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JadwalLiburController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
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
     * middleware: users super admin */
    Route::get('/role', [UserRoleController::class, 'index']);
    Route::get('/role/{role}', [UserRoleController::class, 'show']);
    Route::post('/role', [UserRoleController::class, 'create']);
    Route::put('/role/{role}', [UserRoleController::class, 'update']);
    Route::delete('/role/{role}', [UserRoleController::class, 'delete']);

    /** USER MANAGEMENT
     * middleware: users super admin */
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{user}', [UserController::class, 'show']);
    Route::post('/user', [UserController::class, 'create'])->name('create-user');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('update-user');
    Route::delete('/user/{user}', [UserController::class, 'delete']);

    /** Master Jadwal Libur
     * middleware: users super admin */
    Route::get('/jadwal-libur', [JadwalLiburController::class, 'index']);
    Route::post('/jadwal-libur', [JadwalLiburController::class, 'create']);
    Route::put('/jadwal-libur/{jadwal_libur}', [JadwalLiburController::class, 'update']);
    Route::delete('/jadwal-libur/{jadwal_libur}', [JadwalLiburController::class, 'delete']);
});
