<?php

namespace App\Providers;

use App\Models\Shipment;
use App\Models\Vehicle;
use App\Policies\ShipmentPolicy;
use App\Policies\VehiclePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Gate::policy(Shipment::class, ShipmentPolicy::class);
        Gate::policy(Vehicle::class, VehiclePolicy::class);
    }
}
