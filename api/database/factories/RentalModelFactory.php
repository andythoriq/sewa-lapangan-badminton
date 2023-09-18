<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RentalModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'start' => $this->faker->dateTimeBetween('2023-09-01 00:00:00', '2023-10-01 00:00:00'),
            'finish' => $this->faker->dateTimeBetween('2023-11-01 00:00:00', '2023-12-01 00:00:00'),
            'status' => $this->faker->randomElement(['B', 'O', 'F']),
            'price' => $this->faker->randomFloat(2, 10_000.00, 40_000.00),
            'court_id' => $this->faker->randomElement([1, 2, 3]),
            'transaction_id' => $this->faker->randomElement([1, 2, 3]),
            // 'customer_id' => $this->faker->randomElement(['m20230100125', 'm20230100837', 'm20230100960', 'm20230100119', 'r20230100114']),
            'user_id' => $this->faker->randomElement([1, 2, 3])
        ];
    }
}
