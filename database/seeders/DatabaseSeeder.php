<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Carrier;
use App\Models\StreetSuffix;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Shipment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $suffixes = [
            'utca',
            'tér',
            'körút',
            'sétány',
            'út',
            'sor',
            'köz',
            'park',
            'lépcső',
            'dűlő',
            'liget',
            'fasor',
            'közter',
            'telep',
            'kert',
            'híd',
            'rév',
            'ösvény',
            'csárda',
            'domb',
            'halom',
            'zug',
            'lejtő',
            'rakpart',
            'sáv',
            'zugoly',
            'mező',
            'part',
            'hegy',
            'völgy',
            'sziget',
            'erdő'
        ];
        foreach ($suffixes as $suffix) {
            StreetSuffix::create(['name' => $suffix]);
        }
        $user = User::factory()->create([
            'name' => "fuvaradam11",
            'email' => 'adam@fuvar.com',
        ]);
        $carrier = Carrier::factory()->create([
            'first_name' => 'Ádám',
            'last_name' => 'Fuvar',
            'user_id' => $user->id
        ]);
        Vehicle::factory()->withCarrier($carrier)->create();
        Shipment::factory(count: 10)->withCarrier($carrier)->create();
        $admin = User::factory()->create([
            'name' => "adminjozsef12",
            'email' => 'admin.jozsef@fuvar.com',
            'role' => UserRole::ADMIN
        ]);
        $admin = User::factory()->create([
            'name' => "emailteszt",
            'email' => 'email.teszt@fuvar.com',
            'role' => UserRole::ADMIN
        ]);
        Carrier::factory(10)->has(Vehicle::factory())->create();
    }
}
