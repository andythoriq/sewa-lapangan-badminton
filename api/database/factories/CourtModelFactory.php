<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CourtModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'label' => $this->faker->word(),
            'image_path' => $this->faker->word() . '.' . 'png',
            'description' => $this->faker->text(),
            'normal_price' => $this->faker->randomFloat(2, 60_000, 100_000)
        ];
    }
}
