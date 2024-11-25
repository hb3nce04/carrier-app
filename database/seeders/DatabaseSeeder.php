<?php

namespace Database\Seeders;

use App\Models\Carrier;
use App\Models\Vehicle;
use App\Models\Shipment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $carrier = Carrier::factory()->create([
            'name' => 'carrier',
            'email' => 'carrier@carrier.com',
            "is_admin" => false
        ]);
        $admin = Carrier::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            "is_admin" => true
        ]);
        Vehicle::factory(1)->withCarrier($carrier)->create();
        Shipment::factory(5)->withCarrier($carrier)->create();
    }
}
