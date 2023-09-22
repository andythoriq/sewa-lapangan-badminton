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
                'page' => 'Dashboard page',
                'menu' => '/dashboard'
            ],
            [
                'page' => 'Booking page',
                'menu' => '/create-booking'
            ],
            [
                'page' => 'Schedule page',
                'menu' => '/schedule'
            ],
            [
                'page' => 'Booking history page',
                'menu' => '/history-booking'
            ],
            [
                'page' => 'Master - Court',
                'menu' => '/data-master/court'
            ],
            [
                'page' => 'Master - Regular (list)',
                'menu' => '/data-master/regular'
            ],
            [
                'page' => 'Master - Regular',
                'menu' => '/data-master/customer-regular'
            ],
            [
                'page' => 'Master - Member (list)',
                'menu' => '/data-master/member'
            ],
            [
                'page' => 'Master - Member',
                'menu' => '/data-master/customer-member'
            ],
            [
                'page' => 'Master - Holiday',
                'menu' => '/data-master/holidays'
            ],
            [
                'page' => 'Master - Peak time',
                'menu' => '/data-master/rush'
            ],
            [
                'page' => 'Master - User',
                'menu' => '/user-management/user-list'
            ],
            [
                'page' => 'Master - User role',
                'menu' => '/user-management/user-role'
            ]
        ];
        return response()->json($menus);
    }
}
