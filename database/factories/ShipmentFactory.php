<?php

namespace Database\Factories;

use App\Models\Carrier;
use App\Enums\ShipmentStatus;
use App\Models\StreetSuffix;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'departure_address_id' => AddressFactory::new()->create()->id,
            'consignee_id' => ConsigneeFactory::new()->create()->id,
            'status' => fake()->randomElement(array_column(ShipmentStatus::cases(), 'value')),
        ];
    }

    public function withCarrier(Carrier $carrier)
    {
        return $this->state(['carrier_id' => $carrier->id]);
    }
}
