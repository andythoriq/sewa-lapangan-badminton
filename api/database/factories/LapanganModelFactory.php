<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LapanganModelFactory extends Factory
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
            'deskripsi' => $this->faker->text(),
            'harga_normal' => $this->faker->randomFloat(2, 60_000, 100_000)
        ];
    }
}
