<?php

namespace Tests\Feature;

use App\Enums\ShipmentStatus;
use App\Models\Admin;
use App\Models\Carrier;
use App\Models\Shipment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShipmentTest extends TestCase
{
    use RefreshDatabase;
    public function test_admin_cannot_create_shipment_for_admin()
    {
        $admin = Carrier::factory()->create([
            'email' => 'jozsef.admin@fuvar.com',
            'password' => 'password',
            'first_name' => "József",
            'last_name' => "Admin",
        ]);
        $data = [
            "departure_address" => "1000, Budapest, Kossuth Lajos utca 1.",
            "arrival_address" => "2000, Szentendre, Duna korzó 1.",
            "consignee_last_name" => "Teszt",
            "consignee_first_name" => "Címzett",
            "consignee_phone_number" => "06121231234",
            "carrier_id" => $admin->id,
            "status" => ShipmentStatus::ISSUED->value,
        ];
        Admin::factory()->withCarrier($admin)->create();
        $this->actingAs($admin);
        $response = $this->post(route("shipments.store"), $data);
        $response->assertStatus(400);
    }

    public function test_admin_can_create_a_shipment()
    {
        $data = [
            "departure_address" => "1000, Budapest, Kossuth Lajos utca 1.",
            "arrival_address" => "2000, Szentendre, Duna korzó 1.",
            "status" => ShipmentStatus::ISSUED->value,
        ];
        $carrier = Carrier::factory()->create();
        $admin = Carrier::factory()->create([
            'email' => 'jozsef.admin@fuvar.com',
            'password' => 'password',
            'first_name' => "József",
            'last_name' => "Admin",
        ]);
        Admin::factory()->withCarrier($admin)->create();
        $this->actingAs($admin);
        $this->post(route("shipments.store"), array_merge($data, [
            "consignee_last_name" => "Teszt",
            "consignee_first_name" => "Címzett",
            "consignee_phone_number" => "06121231234",
            "carrier_id" => $carrier->id,
        ]));
        $this->assertDatabaseHas('shipments', $data);
    }

    public function test_admin_can_change_status_for_a_shipment()
    {
        $carrier = Carrier::factory()->create();
        $shipment = Shipment::factory()->withCarrier($carrier)->create([
            "status" => ShipmentStatus::ISSUED->value,
        ]);
        $admin = Carrier::factory()->create([
            'email' => 'jozsef.admin@fuvar.com',
            'password' => 'password',
            'first_name' => "József",
            'last_name' => "Admin",
        ]);
        Admin::factory()->withCarrier($admin)->create();
        $this->actingAs($admin);
        $this->patch(route("shipments.changeStatus", $shipment), ["status" => ShipmentStatus::FINISHED->value]);
        $this->assertDatabaseHas('shipments', ["status" => ShipmentStatus::FINISHED->value]);
    }

    public function test_carrier_can_change_status_for_its_shipment()
    {
        $carrier = Carrier::factory()->create();
        $shipment = Shipment::factory()->withCarrier($carrier)->create([
            "status" => ShipmentStatus::ISSUED->value,
        ]);
        $this->actingAs($carrier);
        $this->patch(route("shipments.changeStatus", $shipment), ["status" => ShipmentStatus::FINISHED->value]);
        $this->assertDatabaseHas('shipments', ["status" => ShipmentStatus::FINISHED->value]);
    }

    public function test_carrier_cannot_change_status_for_other_shipment()
    {
        $carrier = Carrier::factory()->create();
        $carrierOther = Carrier::factory()->create();
        $shipment = Shipment::factory()->withCarrier($carrierOther)->create([
            "status" => ShipmentStatus::ISSUED->value,
        ]);
        $this->actingAs($carrier);
        $request = $this->patch(route("shipments.changeStatus", $shipment), ["status" => ShipmentStatus::FINISHED->value]);
        $request->assertStatus(403);
    }

    public function test_carrier_cannot_change_status_when_failed()
    {
        $carrier = Carrier::factory()->create();
        $shipment = Shipment::factory()->withCarrier($carrier)->create([
            "status" => ShipmentStatus::FAILED->value,
        ]);
        $this->actingAs($carrier);
        $this->patch(route("shipments.changeStatus", $shipment), ["status" => ShipmentStatus::FINISHED->value]);
        $this->assertDatabaseHas('shipments', ["status" => ShipmentStatus::FAILED->value]);
    }

    public function test_admin_cannot_change_status_when_failed()
    {
        $carrier = Carrier::factory()->create();
        $shipment = Shipment::factory()->withCarrier($carrier)->create([
            "status" => ShipmentStatus::FAILED->value,
        ]);
        $admin = Carrier::factory()->create([
            'email' => 'jozsef.admin@fuvar.com',
            'password' => 'password',
            'first_name' => "József",
            'last_name' => "Admin",
        ]);
        Admin::factory()->withCarrier($admin)->create();
        $this->actingAs($admin);
        $this->patch(route("shipments.changeStatus", $shipment), ["status" => ShipmentStatus::FINISHED->value]);
        $this->assertDatabaseHas('shipments', ["status" => ShipmentStatus::FAILED->value]);
    }

    public function test_carrier_cannot_change_status_when_finished()
    {
        $carrier = Carrier::factory()->create();
        $shipment = Shipment::factory()->withCarrier($carrier)->create([
            "status" => ShipmentStatus::FINISHED->value,
        ]);
        $this->actingAs($carrier);
        $this->patch(route("shipments.changeStatus", $shipment), ["status" => ShipmentStatus::ISSUED->value]);
        $this->assertDatabaseHas('shipments', ["status" => ShipmentStatus::FINISHED->value]);
    }

    public function test_admin_cannot_change_status_when_finished()
    {
        $carrier = Carrier::factory()->create();
        $shipment = Shipment::factory()->withCarrier($carrier)->create([
            "status" => ShipmentStatus::FINISHED->value,
        ]);
        $admin = Carrier::factory()->create([
            'email' => 'jozsef.admin@fuvar.com',
            'password' => 'password',
            'first_name' => "József",
            'last_name' => "Admin",
        ]);
        Admin::factory()->withCarrier($admin)->create();
        $this->actingAs($admin);
        $this->patch(route("shipments.changeStatus", $shipment), ["status" => ShipmentStatus::ISSUED->value]);
        $this->assertDatabaseHas('shipments', ["status" => ShipmentStatus::FINISHED->value]);
    }
}
