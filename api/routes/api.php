<?php

use App\Http\Controllers\Master\{CloseDateController, CourtController, CustomerController, UserController, RoleController, RentalController, PeakTimeController};
use App\Http\Controllers\{AuthController, PenyewaanController};
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

    /** User Role
     * role/policy: role-handle, user-handle, admin, can't delete&update admin */
    Route::get('/role', [RoleController::class, 'index']);
    Route::get('/role/{role}', [RoleController::class, 'show']);
    Route::post('/role', [RoleController::class, 'create']);
    Route::put('/role/{role}', [RoleController::class, 'update']);
    Route::delete('/role/{role}', [RoleController::class, 'delete']);

    /** User Management
     * role/policy: user-handle, admin */
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{user}', [UserController::class, 'show']);
    Route::post('/user', [UserController::class, 'create']);
    Route::put('/user/{user}', [UserController::class, 'update']);
    Route::delete('/user/{user}', [UserController::class, 'delete']);

    /** Master Jadwal Libur / jadwal libur gor
     * role/policy: jadwal-handle, close-date-handle, admin */
    Route::get('/close-date', [CloseDateController::class, 'index']);
    Route::post('/close-date', [CloseDateController::class, 'create'])->name('close-date-create');
    Route::put('/close-date/{close_date}', [CloseDateController::class, 'update'])->name('close-date-update');
    Route::delete('/close-date/{close_date}', [CloseDateController::class, 'delete']);

    /** Master Jadwal Sibuk / jadwal sibuk lapangan
     * role/policy: jadwal-handle, jadwal-sibuk-handle, admin */
    Route::get('/peak-time', [PeakTimeController::class, 'index']);
    Route::get('/peak-time/{peak_time}', [PeakTimeController::class, 'show']);
    Route::post('/peak-time', [PeakTimeController::class, 'create'])->name('peak-time-create');
    Route::put('/peak-time/{peak_time}', [PeakTimeController::class, 'update'])->name('peak-time-update');
    Route::delete('/peak-time/{peak_time}', [PeakTimeController::class, 'delete']);

    /** Master Lapangan
     * role/policy: lapangan-handle, admin */
    Route::get('/court', [CourtController::class, 'index']);
    Route::get('/court/{court}', [CourtController::class, 'show']);
    Route::post('/court', [CourtController::class, 'create']);
    Route::put('/court/{court}', [CourtController::class, 'update']);
    Route::delete('/court/{court}', [CourtController::class, 'delete']);

    /** Master Customer
     * role/policy: customer-handle, customer-regular-handle, customer-member-handle, admin */
    Route::prefix('/customer/member')->group(function(){
        Route::get('/', [CustomerController::class, 'index_M']);
        Route::get('/{customer}', [CustomerController::class, 'show_M']);
        Route::post('/', [CustomerController::class, 'create_M']);
        Route::put('/{customer}', [CustomerController::class, 'update_M']);
        Route::delete('/{customer}', [CustomerController::class, 'delete_M']);
    });
    Route::prefix('/customer/regular')->group(function () {
        Route::get('/', [CustomerController::class, 'index_R']);
        Route::get('/{customer}', [CustomerController::class, 'show_R']);
        Route::post('/', [CustomerController::class, 'create_R']);
        Route::put('/{customer}', [CustomerController::class, 'update_R']);
        Route::delete('/{customer}', [CustomerController::class, 'delete_R']);
    });

    /** Master Jadwal Sewa
     * role/policy: customer-handle, jadwal-handle, jadwal-sewa-handle, admin */
    Route::get('/rental', [RentalController::class, 'index']);
    Route::get('/rental/{rental}', [RentalController::class, 'show']);
    Route::post('/rental', [RentalController::class, 'create'])->name('create-rental');
    Route::put('/rental/{rental}', [RentalController::class, 'update'])->name('update-rental');
    Route::delete('/rental/{rental}', [RentalController::class, 'delete']);

    /** Transaction
     * role/policy: transaction-handle, admin */

    /** End of master data */

    /** Penyewaan
     * role/policy: penyewaan-handle, admin */
    Route::post('/penyewaan', PenyewaanController::class);

    /** AUTH ROUTES
     * role/policy: admin */
    Route::post('/login', [AuthController::class, 'login'])->name('login')->withoutMiddleware('auth:sanctum');
    Route::post('/register', [AuthController::class, 'register'])->name('register')->withoutMiddleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});
