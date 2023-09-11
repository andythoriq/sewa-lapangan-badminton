<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains / hosts will receive stateful API
    | authentication cookies. Typically, these should include your local
    | and production domains which access your API via a frontend SPA.
    |
    */

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
    ))),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | This array contains the authentication guards that will be checked when
    | Sanctum is trying to authenticate a request. If none of these guards
    | are able to authenticate the request, Sanctum will use the bearer
    | token that's present on an incoming request for authentication.
    |
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This value controls the number of minutes until an issued token will be
    | considered expired. If this value is null, personal access tokens do
    | not expire. This won't tweak the lifetime of first-party sessions.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating your first-party SPA with Sanctum you may need to
    | customize some of the middleware Sanctum uses while processing the
    | request. You may change the middleware listed below as required.
    |
    */

    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],

    'expiration_time' => 60 * 24 * 7, // one week
    'rememberable' => true,

    // 'abilities' => [
    //     'customer' => 'landing page, about page.',
    //     'admin' => '* except handling auth.',
    //     'user-handle' => 'user master (admin) and role master.',
    //     'configuration-handle' => 'configuration master.',
    //     'schedule-handle' => 'things related to rental and scheduling.',
    //     'court-handle' => 'court master.',
    //     'customer-handle' => 'regular master, member master, rental master.',
    //     'rental-handle' => 'rental master, transaction master.',
    //     'transaction-handle' => 'transaction master.',
    //     'auth-handle' => 'customer auth-controller, admin (user) auth-controller.',
    // ],

];

// \Illuminate\Support\Facades\Route::post('/login', function () {

//     $user = Auth::user(); | $user = Auth::user('customers')
//     $token = $user->createToken('token', ['ability-1', 'ability-2']);

//     return ['token' => $token->plainTextToken];
// });

// $request->user()->tokenCan('ability-1')
