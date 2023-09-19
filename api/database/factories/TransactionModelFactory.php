<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'total_price' => $this->faker->randomFloat(2, 10_000.00, 100_000.00),
            'total_hour' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            'booking_code' => $this->faker->unique()->word()
        ];
    }
}
