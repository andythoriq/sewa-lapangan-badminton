<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
// use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Contracts\Validation\DataAwareRule;

class Year2000 implements Rule, DataAwareRule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    protected $data = [];

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $year = substr($value, 0, 4);
        $rest = substr($value, 4);

        if (strlen($year) != 4 || strlen($value) != 19 || strlen($rest) != 15) {
            return false;
        }

        if ($year != 2000) {
            $year = 2000;
            $this->setData([$attribute => $year . $rest]);
        }

        return true;
    }

    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The year must 2000.';
    }
}
