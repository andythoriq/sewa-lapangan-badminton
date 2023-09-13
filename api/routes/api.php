<?php

use App\Http\Controllers\{AuthCustomerController, AuthAdminController};
use App\Http\Controllers\Master\{HolidayController, ConfigController, OpenTimeController, CourtController, CustomerController, UserController, RoleController, RentalController, PeakTimeController, TransactionController};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
| test

*/

Route::middleware('auth:sanctum')->group(function () {

    /** Master User Role
     * policy/role: user-handle, admin */
    Route::controller(RoleController::class)->group(function(){
        Route::get('/role', 'index');
        Route::get('/role/{role}', 'show');
        Route::post('/role', 'create');
        Route::put('/role/{role}', 'update');
        Route::delete('/role/{role}', 'delete');
    });

    /** Master User Management
     * policy/role: user-handle, admin */
    Route::controller(UserController::class)->group(function(){
        Route::get('/user', 'index');
        Route::get('/user/{user}', 'show');
        Route::post('/user', 'create');
        Route::put('/user/{user}', 'update');
        Route::delete('/user/{user}', 'delete');
    });

    /** Master Configuration
     * policy/role: configuration-handle, admin */
    Route::controller(ConfigController::class)->group(function(){
        Route::get('/config', 'index');
        Route::get('/config/{config}', 'show');
        Route::post('/config', 'create');
        Route::put('/config/{config}', 'update');
        Route::delete('/config/{config}', 'delete');
    });

    /** Master Holiday
     * policy/role: schedule-handle, admin */
    Route::controller(HolidayController::class)->group(function(){
        Route::get('/holiday', 'index');
        Route::post('/holiday', 'create');
        Route::post('/create-multiple-holiday', 'create_multiple')->name('create-multiple-holiday');
        Route::put('/holiday/{holiday}', 'update');
        Route::delete('/holiday/{holiday}', 'delete');
    });

    /** Master Open time
     * policy/role: schedule-handle, admin */
    Route::controller(OpenTimeController::class)->group(function(){
        Route::get('/open-time', 'index');
        Route::post('/open-time', 'create');
        Route::put('/open-time/{open_time}', 'update');
        Route::delete('/open-time/{open_time}', 'delete');
    });

    /** Master Peak time / peak time court
     * policy/role: schedule-handle, admin */
    Route::controller(PeakTimeController::class)->group(function(){
        Route::get('/peak-time', 'index');
        Route::get('/peak-time/{peak_time}', 'show');
        Route::post('/peak-time', 'create');
        Route::post('/create-multiple-peak-time', 'create_multiple')->name('create-multiple-peak-time');
        Route::put('/peak-time/{peak_time}', 'update');
        Route::delete('/peak-time/{peak_time}', 'delete');
    });

    /** Master Court
     * policy/role: court-handle, admin */
    Route::controller(CourtController::class)->group(function(){
        Route::get('/court', 'index');
        Route::get('/court/{court}', 'show');
        Route::post('/court', 'create');
        Route::put('/court/{court}', 'update');
        Route::delete('/court/{court}', 'delete');
    });

    /** Master Customer
     * policy/role: customer-handle, admin */
    Route::controller(CustomerController::class)->group(function(){
        Route::prefix('/customer/member')->group(function () {
            Route::get('/', 'index_M');
            Route::get('/{customer}', 'show_M');
            Route::post('/', 'create_M');
            Route::put('/{customer}', 'update_M');
            Route::delete('/{customer}', 'delete_M');
        });
        Route::prefix('/customer/regular')->group(function () {
            Route::get('/', 'index_R');
            Route::get('/{customer}', 'show_R');
            Route::post('/', 'create_R');
            Route::put('/{customer}', 'update_R');
            Route::delete('/{customer}', 'delete_R');
        });
    });

    /** Master Rental
     * policy/role: customer-handle, schedule-handle, rental-handle, admin */
    Route::controller(RentalController::class)->group(function(){
        Route::get('/rental', 'index');
        Route::get('/rental/{rental}', 'show');
        Route::post('/rental', 'create')->name('create-rental');
        Route::post('/create-multiple-rental', 'create_multiple')->name('create-multiple-rental');
        Route::put('/rental/{rental}', 'update')->name('update-rental');
        Route::delete('/rental/{rental}', 'delete');
    });

    /** Transaction
     * policy/role: transaction-handle, rental-handle, schedule-handle, admin */
    Route::controller(TransactionController::class)->group(function(){
        Route::get('/transaction', 'index');
        Route::get('/transaction/{transaction}', 'show');
    });

    /** Admin AUTH ROUTES
     * policy/role: auth-handle, admin */
    Route::controller(AuthAdminController::class)->group(function(){
        Route::post('/login-admin', 'login')->name('login-admin')->withoutMiddleware('auth:sanctum');
        Route::post('/login-admin/{admin}', 'login_for_other');
        Route::post('/register-admin', 'register')->name('register-admin')->withoutMiddleware('auth:sanctum');
        Route::post('/logout-admin', 'logout');
        Route::get('/me-admin', 'me');
    });

    /** Customer AUTH ROUTES
     * policy/role: auth-handle, admin */
    Route::controller(AuthCustomerController::class)->group(function(){
        Route::post('/login', 'login')->name('login-customer')->withoutMiddleware('auth:sanctum');
        Route::post('/register-member', 'register')->name('register-customer')->withoutMiddleware('auth:sanctum');
        Route::post('/logout', 'logout');
        Route::post('/me', 'me');
    });
});
