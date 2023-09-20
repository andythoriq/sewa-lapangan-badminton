<?php

namespace App\Traits;

trait SendWA
{
    public function sendWA(string $userkey, string $passkey, string $telepon, string $message)
    {
        $url = 'https://console.zenziva.net/wareguler/api/sendWA/';

        $data = array(
            'userkey' => $userkey,
            'passkey' => $passkey,
            'to' => $telepon,
            'message' => $message
        );

        $curlHandle = curl_init();

        curl_setopt($curlHandle, CURLOPT_URL, $url);
        curl_setopt($curlHandle, CURLOPT_HEADER, 0);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curlHandle, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($curlHandle, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curlHandle, CURLOPT_TIMEOUT, 30);
        curl_setopt($curlHandle, CURLOPT_POST, 1);
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);

        $response = curl_exec($curlHandle);

        if (curl_errno($curlHandle)) {
            return curl_error($curlHandle);
        }

        curl_close($curlHandle);

        return $response;
    }
}
