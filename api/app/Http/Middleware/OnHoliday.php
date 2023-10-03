<?php

namespace App\Http\Middleware;

use App\Models\HolidayModel;
use Closure;
use Illuminate\Http\Request;

class OnHoliday
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
        // $currentDate = now('Asia/Jakarta')->format('Y-m-d'); // m-d

        // $isHoliday = HolidayModel::where('date', $currentDate)->exists();

        // if ($isHoliday) {
        //     abort(403, 'Access Restricted on Holiday.');
        // }
        return $next($request);
    }
}
