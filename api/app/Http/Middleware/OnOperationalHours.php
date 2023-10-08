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
        $config_open_time = ConfigModel::where('slug', 'open-time')->first();

        $today = strtolower(date("l"));

        $string_to_array = json_decode($config_open_time->value, true);

        $get_hours = [];

        foreach ($string_to_array as $value) {
            if ($value['day'] === $today) {
                $get_hours = $value['hours'];
            }
        }

        if (Carbon::now('Asia/Jakarta')->between(Carbon::parse($get_hours['start']), Carbon::parse($get_hours['finish']))) {
            return $next($request);
        }

        abort(403, 'You are outside of operational hours.');
    }
}
