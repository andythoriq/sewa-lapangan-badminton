<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GetRoleMenusController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $menus = [
            [
                'label' => 'Dashboard page',
                'value' => '/dashboard'
            ],
            [
                'label' => 'Booking page',
                'value' => '/create-booking'
            ],
            [
                'label' => 'Schedule page',
                'value' => '/schedule'
            ],
            [
                'label' => 'Booking history page',
                'value' => '/history-booking'
            ],
            [
                'label' => 'Scanner page',
                'value' => '/scanner'
            ],
            [
                'label' => 'Master - Court',
                'value' => '/data-master/court'
            ],
            [
                'label' => 'Master - Regular (list)',
                'value' => '/data-master/regular'
            ],
            [
                'label' => 'Master - Member (list)',
                'value' => '/data-master/member'
            ],
            [
                'label' => 'Master - Holiday',
                'value' => '/data-master/holidays'
            ],
            [
                'label' => 'Master - Calendar',
                'value' => '/data-master/calendar'
            ],
            [
                'label' => 'Master - Peak time (list)',
                'value' => '/data-master/peaktime'
            ],
            [
                'label' => 'Master - User',
                'value' => '/user-management/user-list'
            ],
            [
                'label' => 'Master - User role',
                'value' => '/user-management/user-role'
            ],
            // [
            //     'label' => 'Profile page',
            //     'value' => '/profile'
            // ],
            [
                'label' => 'Setting page',
                'value' => '/setting'
            ],
            [
                'label' => 'Super admin',
                'value' => 'super-admin'
            ]
        ];
        return response()->json($menus);
    }
}
