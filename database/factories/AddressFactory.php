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
            'postal_code' => fake()->postcode(),
            'city' => fake()->city(),
            'street_name' =>explode(' ', $this->faker->streetName())[0],
            'street_suffix_id' => StreetSuffix::pluck('id')->random() ?? 1,
            'street_number' => fake()->buildingNumber().fake()->randomElement(['', '/A', '/B', '/C', '/D', 'A/2', 'B/2', 'C/2', 'D/2', 'e']),
        ];
    }
}
