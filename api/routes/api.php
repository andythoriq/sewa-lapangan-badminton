<?php

use App\Http\Controllers\AuthController;
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
    Route::get('/me', [UserController::class, 'me']);

    /** User Role
     * middleware: users super admin */
    Route::get('/user/role', [UserRoleController::class, 'index']);
    Route::get('/user/role/{role}', [UserRoleController::class, 'show']);
    Route::post('/user/role', [UserRoleController::class, 'create']);
    Route::put('/user/role/{role}', [UserRoleController::class, 'update']);
    Route::delete('/user/role/{role}', [UserRoleController::class, 'delete']);
});
