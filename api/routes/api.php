<?php

use App\Http\Controllers\{AuthCustomerController, AuthAdminController, GetRoleMenusController, SendBookingCodeController, StartRentalController, FinishRentalController, DashboardController};
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

    /** WORKFLOW */

    /** Admin AUTH ROUTES
     * policy/role: auth-handle, admin */
    Route::controller(AuthAdminController::class)->middleware('admin')->group(function(){
        Route::post('/login-admin', 'login')->name('login-admin')->withoutMiddleware(['auth:sanctum', 'admin']);
        Route::post('/login-admin/{admin}', 'login_for_other');
        // Route::post('/register-admin', 'register')->name('register-admin')->withoutMiddleware(['auth:sanctum', 'admin']);
        Route::post('/logout-admin', 'logout');
        Route::get('/me-admin', 'me');
    });

    /** Customer AUTH ROUTES
     * policy/role: auth-handle, admin */
    Route::controller(AuthCustomerController::class)->middleware('customer')->group(function(){
        Route::post('/send-opt', 'send')->name('send-otp')->withoutMiddleware(['auth:sanctum', 'customer']);
        Route::post('/verify-otp', 'verify')->name('verify-otp')->withoutMiddleware(['auth:sanctum', 'customer']);
        Route::post('/logout', 'logout');
        Route::get('/me', 'me');
    });

    /** Master Rental
     * policy/role: customer-handle, schedule-handle, rental-handle, admin */
    Route::controller(RentalController::class)->group(function () {
        Route::get('/rental', 'index');
        Route::get('/rental/{rental}', 'show');
        Route::post('/rental', 'create')->name('create-rental')->middleware('holiday');
        Route::post('/create-multiple-rental', 'create_multiple')->name('create-multiple-rental')->middleware('holiday');
        Route::put('/rental/{rental}', 'update')->name('update-rental');
        Route::delete('/rental/{rental}', 'delete');
    });

    Route::post('/send-booking-code', SendBookingCodeController::class);
    Route::post('/booking-verification/{booking_code}', [TransactionController::class, 'booking_verification'])->middleware('admin');
    Route::post('/start-rental', StartRentalController::class)->middleware('admin');
    Route::post('/finish-rental', FinishRentalController::class)->middleware('admin');

    Route::get('/admin-role-menu-list', GetRoleMenusController::class)->middleware('admin');
    Route::get('/dashboard', DashboardController::class)->middleware('admin');

    /** START MASTER DATA */

    /** Master User/Admin Role
     * policy/role: user-handle, admin */
    Route::controller(RoleController::class)->middleware('admin')->group(function () {
        Route::get('/role', 'index');
        Route::get('/role/{role}', 'show');
        Route::get('/role-edit/{role}', 'edit');
        Route::post('/role', 'create');
        Route::put('/role/{role}', 'update');
        Route::delete('/role/{role}', 'delete');
    });

    /** Master Admin/User Management
     * policy/role: user-handle, admin */
    Route::controller(UserController::class)->middleware('admin')->group(function () {
        Route::get('/admin', 'index');
        Route::get('/admin/{user}', 'show');
        Route::get('/admin-edit/{user}', 'edit');
        Route::post('/admin', 'create');
        Route::put('/admin/{user}', 'update');
        Route::delete('/admin/{user}', 'delete');
    });

    /** Master Configuration
     * policy/role: configuration-handle, admin */
    Route::controller(ConfigController::class)->middleware('admin')->group(function () {
        Route::get('/config', 'index');
        Route::get('/config/{config}', 'show');
        Route::post('/config', 'create');
        Route::put('/config/{config}', 'update');
        Route::delete('/config/{config}', 'delete');
    });

    /** Master Holiday
     * policy/role: schedule-handle, admin */
    Route::controller(HolidayController::class)->middleware('admin')->group(function () {
        Route::get('/holiday', 'index');
        Route::post('/holiday', 'create');
        Route::post('/create-multiple-holiday', 'create_multiple')->name('create-multiple-holiday');
        Route::put('/holiday/{holiday}', 'update');
        Route::delete('/holiday/{holiday}', 'delete');
    });

    /** Master Open time
     * policy/role: schedule-handle, admin */
    Route::controller(OpenTimeController::class)->middleware('admin')->group(function () {
        Route::get('/open-time', 'index');
        Route::post('/open-time', 'create');
        Route::put('/open-time/{open_time}', 'update');
        Route::delete('/open-time/{open_time}', 'delete');
    });

    /** Master Peak time / peak time court
     * policy/role: schedule-handle, admin */
    Route::controller(PeakTimeController::class)->middleware('admin')->group(function () {
        Route::get('/peak-time', 'index');
        Route::get('/peak-time/{peak_time}', 'show');
        Route::post('/peak-time', 'create');
        Route::post('/create-multiple-peak-time', 'create_multiple')->name('create-multiple-peak-time');
        Route::put('/peak-time/{peak_time}', 'update');
        Route::delete('/peak-time/{peak_time}', 'delete');
    });

    /** Master Court
     * policy/role: court-handle, admin */
    Route::controller(CourtController::class)->middleware('admin')->group(function () {
        Route::get('/court', 'index');
        Route::get('/court/{court}', 'show');
        Route::get('/court-select', 'court_select');
        Route::get('/court-edit/{court}', 'edit');
        Route::post('/court', 'create');
        Route::post('/court/{court}', 'update');
        Route::delete('/court/{court}', 'delete');
    });

    /** Master Customer
     * policy/role: customer-handle, admin */
    Route::controller(CustomerController::class)->group(function () {
        Route::prefix('/customer/member')->group(function () {
            Route::get('/', 'index_M');
            Route::get('/{customer}', 'show_M');
            Route::post('/', 'create_M');
            Route::put('/{customer}', 'update_M')->name('update-member');
            Route::delete('/{customer}', 'delete_M');
            Route::get('/{customer}/edit', 'edit_M');
        });
        Route::prefix('/customer/regular')->group(function () {
            Route::get('/', 'index_R');
            Route::get('/{customer}', 'show_R');
            Route::post('/', 'create_R');
            Route::put('/{customer}', 'update_R')->name('update-regular');
            Route::delete('/{customer}', 'delete_R');
            Route::get('/{customer}/edit', 'edit_R');
        });
    });

    /** Transaction
     * policy/role: transaction-handle, rental-handle, schedule-handle, admin */
    Route::controller(TransactionController::class)->middleware('admin')->group(function () {
        Route::get('/transaction', 'index');
        Route::get('/transaction/{transaction}', 'show');
    });
});
