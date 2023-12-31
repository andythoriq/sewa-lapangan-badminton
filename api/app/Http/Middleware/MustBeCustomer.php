<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class MustBeCustomer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user('customers') === auth()->user() || auth()->user() instanceof \App\Models\CustomerModel || $request->user('customers') instanceof \App\Models\CustomerModel) {
            return $next($request);
        }
        abort(403, 'only customers can access this url.');
    }
}
