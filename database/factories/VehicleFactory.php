<?php

namespace Database\Factories;

use App\Models\Carrier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "brand" => fake()->randomElement(["Toyota", "Honda", "Ford", "Chevrolet", "Nissan"]),
            "model" => fake()->randomElement(["Corolla", "Civic", "F-150", "Silverado", "Sentra"]),
            "plate_number" => fake()->regexify("[A-Z]{3}-[0-9]{3}"),
        ];
    }

    public function withCarrier(Carrier $carrier)
    {
        return $this->state(["carrier_id" => $carrier->id]);
    }
}
