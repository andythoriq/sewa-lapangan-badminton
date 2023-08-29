<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JadwalSibukModelFactory extends Factory
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
            'end' => $this->faker->dateTimeBetween('2023-11-01 00:00:00', '2023-12-01 00:00:00')
        ];
    }
}
