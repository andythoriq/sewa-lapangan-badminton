<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoleModelFactory extends Factory
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
            'menu' =>  implode(', ', $this->getRandomWordInArray(rand(1, 5))),
            'status' => 'Y'
        ];
    }

    public function getRandomWordInArray(int $max) : array
    {
        $arr = [];
        for ($i = 0; $i < $max; $i++) {
            $arr[] = $this->faker->word();
        }
        return $arr;
    }
}
