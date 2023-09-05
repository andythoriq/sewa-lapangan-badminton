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
            'status' => 'U',
            'price' => $this->faker->float,
            'court_id' => $this->faker->randomElement([1,2,3,4,5]),
            'transaction_id' => null,
            'customer_id' => $this->faker->randomElement([1,2,3,4,5]),
            'user_id' => $this->faker->randomElement([1,2,3,4,5])
        ];
    }
}
