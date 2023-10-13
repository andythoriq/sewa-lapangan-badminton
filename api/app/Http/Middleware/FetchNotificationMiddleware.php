<?php

namespace App\Http\Middleware;

use App\Models\NotificationModel;
use Closure;
use Illuminate\Http\Request;

class FetchNotificationMiddleware
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
        $response = $next($request);

        $data = json_decode($response->content(), true);

        $data['notification'] = [
            'data' => NotificationModel::getNotifications(),
            'unread' => NotificationModel::getUnreadCount()
        ];

        $response->setContent(json_encode($data));

        return $response;
    }
}
