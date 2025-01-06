<?php

namespace Database\Factories;

use App\Models\StreetSuffix;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Consignee>
 */
class ConsigneeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'address_id' => AddressFactory::new()->create()->id,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone_number' => '+36'.fake()->randomElement(['20', '30', '70']).fake()->numerify('#######'),
        ];
    }
}
