<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PelangganModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'code_pelanggan' => 'm20230100' . $this->faker->unique()->numberBetween(1, 999),
            'nama' => $this->faker->name(),
            'no_telp' => $this->faker->unique()->phoneNumber(),
            'deposit' => $this->faker->randomFloat(2, 50_000, 60_000),
            'hutang' => $this->faker->randomFloat(2, 60_000, 100_000),
            'status' => 'R',
            // 'masa_aktif_member' => $this->faker->dateTimeBetween('2023-01-01 00:00:00', '2023-12-30 00:00:00'),
            'masa_aktif_member' => null
        ];
    }
}
