<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class MustBeAdmin
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
        if ($request->user() === auth()->user() || auth()->user() instanceof \App\Models\User || $request->user() instanceof \App\Models\User) {
            return $next($request);
        }

        abort(403, 'only admin can access this url.');
    }
}
