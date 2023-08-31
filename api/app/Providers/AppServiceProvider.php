<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Model::preventLazyLoading(! app()->isProduction());
        Validator::extend('year2000', function($attribute, $value, $parameters, $validator){

            if (! is_numeric($value) || strlen($value) !== 4) {
                return false;
            }

            if ($value == 2000) {
                return true;
            }

            $validator->setData([$attribute => 2000]);

            return true;
        });
    }
}
