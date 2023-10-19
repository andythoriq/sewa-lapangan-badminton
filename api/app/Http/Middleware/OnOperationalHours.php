<?php

namespace App\Http\Middleware;

use App\Models\ConfigModel;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class OnOperationalHours
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
        $config_open_time = ConfigModel::getOpenTime();

        $today = strtolower(Carbon::now('Asia/Jakarta')->dayName);

        $get_hours = [];

        foreach ($config_open_time as $value) {
            if ($value['day'] === $today) {
                $get_hours = ['start' => $value['start'], 'finish' => $value['finish']];
            }
        }

        if (count($get_hours) > 0) {
            if (Carbon::now('Asia/Jakarta')->between(Carbon::parse($get_hours['start'], 'Asia/Jakarta'), Carbon::parse($get_hours['finish'], 'Asia/Jakarta'))) {
                return $next($request);
            }
        }

        abort(403, 'You are outside of operational hours.');
    }
}
