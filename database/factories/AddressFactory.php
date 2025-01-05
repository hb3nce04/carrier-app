<?php

namespace Database\Factories;

use App\Models\StreetSuffix;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'postal' => fake()->postcode(),
            'city' => fake()->city(),
            'street_name' =>explode(' ', $this->faker->streetName())[0],
            'street_suffix_id' => StreetSuffix::pluck('id')->random() ?? 1,
            'number' => fake()->buildingNumber(),
        ];
    }
}
