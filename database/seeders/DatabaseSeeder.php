<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Carrier;
use App\Models\Vehicle;
use App\Models\Shipment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $carrier = Carrier::factory()->create([
            'first_name' => "Ádám",
            'last_name' => "Fuvar",
            'email' => 'fuvar@adam.com',
        ]);
        $admin = Carrier::factory()->create([
            'first_name' => "József",
            'last_name' => "Admin",
            'email' => 'admin@jozsi.com',
        ]);
        Admin::factory(1)->withCarrier($admin)->create();
        Vehicle::factory(1)->withCarrier($carrier)->create();
        Shipment::factory(3)->withCarrier($carrier)->create();
    }
}
