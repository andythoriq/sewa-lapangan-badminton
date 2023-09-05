<?php

use App\Http\Controllers\Master\{HolidayController, ConfigController, OpenTimeController, CourtController, CustomerController, UserController, RoleController, RentalController, PeakTimeController};
use App\Http\Controllers\AuthController;
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

    /** Master User Role
     * abilities/policy/role: role-handle, user-handle, admin, can't delete&update admin */
    Route::get('/role', [RoleController::class, 'index']);
    Route::get('/role/{role}', [RoleController::class, 'show']);
    Route::post('/role', [RoleController::class, 'create']);
    Route::put('/role/{role}', [RoleController::class, 'update']);
    Route::delete('/role/{role}', [RoleController::class, 'delete']);

    /** Master User Management
     * abilities/policy/role: user-handle, admin */
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{user}', [UserController::class, 'show']);
    Route::post('/user', [UserController::class, 'create']);
    Route::put('/user/{user}', [UserController::class, 'update']);
    Route::delete('/user/{user}', [UserController::class, 'delete']);

    /** Master Configuration
     * abilities/policy/role: configuration-handle, admin */
    Route::get('/config', [ConfigController::class, 'index']);
    Route::get('/config/{config}', [ConfigController::class, 'show']);
    Route::post('/config', [ConfigController::class, 'create']);
    Route::put('/config/{config}', [ConfigController::class, 'update']);
    Route::delete('/config/{config}', [ConfigController::class, 'delete']);

    /** Master Holiday
     * abilities/policy/role: schedule-handle, holiday-handle, admin */
    Route::get('/holiday', [HolidayController::class, 'index']);
    Route::post('/holiday', [HolidayController::class, 'create']);
    Route::post('/create-multiple-holiday', [HolidayController::class, 'create_multiple'])->name('create-multiple-holiday');
    Route::put('/holiday/{holiday}', [HolidayController::class, 'update']);
    Route::delete('/holiday/{holiday}', [HolidayController::class, 'delete']);

    /** Master Open time
     * abilities/policy/role: schedule-handle, open-time-handle, admin */
    Route::get('/open-time', [OpenTimeController::class, 'index']);
    Route::post('/open-time', [OpenTimeController::class, 'create']);
    Route::put('/open-time/{open_time}', [OpenTimeController::class, 'update']);
    Route::delete('/open-time/{open_time}', [OpenTimeController::class, 'delete']);

    /** Master Peak time / peak time court
     * abilities/policy/role: schedule-handle, peak-time-handle, admin */
    Route::get('/peak-time', [PeakTimeController::class, 'index']);
    Route::get('/peak-time/{peak_time}', [PeakTimeController::class, 'show']);
    Route::post('/peak-time', [PeakTimeController::class, 'create']);
    Route::post('/create-multiple-peak-time', [PeakTimeController::class, 'create_multiple'])->name('create-multiple-peak-time');
    Route::put('/peak-time/{peak_time}', [PeakTimeController::class, 'update']);
    Route::delete('/peak-time/{peak_time}', [PeakTimeController::class, 'delete']);

    /** Master Court
     * abilities/policy/role: court-handle, admin */
    Route::get('/court', [CourtController::class, 'index']);
    Route::get('/court/{court}', [CourtController::class, 'show']);
    Route::post('/court', [CourtController::class, 'create']);
    Route::put('/court/{court}', [CourtController::class, 'update']);
    Route::delete('/court/{court}', [CourtController::class, 'delete']);

    /** Master Customer
     * abilities/policy/role: customer-handle, admin, customer-member-handle, customer-regular-handle */
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

    /** Master Rental
     * abilities/policy/role: customer-handle, schedule-handle, rental-handle, admin */
    Route::get('/rental', [RentalController::class, 'index']);
    Route::get('/rental/{rental}', [RentalController::class, 'show']);
    Route::post('/rental', [RentalController::class, 'create'])->name('create-rental');
    Route::post('/create-multiple-rental', [RentalController::class, 'create_multiple'])->name('create-multiple-rental');
    Route::put('/rental/{rental}', [RentalController::class, 'update'])->name('update-rental');
    Route::delete('/rental/{rental}', [RentalController::class, 'delete']);

    /** Transaction
     * abilities/policy/role: transaction-handle, rental-handle, admin */

    /** End of master data */

    /** AUTH ROUTES
     * abilities/policy/role: auth-handle */
    Route::post('/login', [AuthController::class, 'login'])->name('login')->withoutMiddleware('auth:sanctum');
    Route::post('/register', [AuthController::class, 'register'])->name('register')->withoutMiddleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});
