<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;

trait LampControl
{
    private function update_value(string $value) : void
    {
        Http::get('https://blynk.cloud/external/api/update', [
            'token' => env('BLYNK_AUTH_TOKEN', ''),
            'dataStreamId' => env('BLYNK_DATASTREAM_ID', '1'),
            'value' => $value,
        ]);
    }

    private function get_value()
    {
        return Http::get('https://blynk.cloud/external/api/get', [
            'token' => env('BLYNK_AUTH_TOKEN', ''),
            'dataStreamId' => env('BLYNK_DATASTREAM_ID', '1'),
        ]);
    }

    public function turn_on_lamp()
    {
        $this->update_value('1');
        return $this->get_value();
    }

    public function turn_off_lamp()
    {
        $this->update_value('0');
        return $this->get_value();
    }
}
