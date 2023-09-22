<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PeakTimeModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'start' => $this->faker->time(),
            'finish' => $this->faker->time(),
            'price_increase' => $this->faker->randomElement([100_000.00,90_000.00]),
            'day_name' => $this->faker->randomElement(['monday', 'sunday', 'saturday'])
        ];
    }
}
