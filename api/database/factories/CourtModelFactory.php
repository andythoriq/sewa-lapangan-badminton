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
            'image_path' => null,
            'description' => $this->faker->text(),
            'initial_price' => $this->faker->randomElement([10_000.00, 15_000.00, 20_000.00, 25_000.00, 30_000.00])
        ];
    }
}
