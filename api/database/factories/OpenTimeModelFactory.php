<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OpenTimeModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'start' => $this->faker->time('H:i:s', 'now'),
            'finish' => $this->faker->time()
        ];
    }
}
