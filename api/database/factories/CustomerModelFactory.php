<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'customer_code' => 'm20230100' . $this->faker->unique()->numberBetween(1, 999),
            'nama' => $this->faker->name(),
            'phone_number' => $this->faker->unique()->phoneNumber(),
            'deposit' => $this->faker->randomFloat(2, 50_000, 60_000),
            'debt' => $this->faker->randomFloat(2, 60_000, 100_000),
            'status' => 'R',
            // 'member_active_period' => $this->faker->dateTimeBetween('2023-01-01 00:00:00', '2023-12-30 00:00:00'),
            'member_active_period' => null
        ];
    }
}
