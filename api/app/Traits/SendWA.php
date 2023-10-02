<?php

namespace App\Traits;

trait SendWA
{
    public function sendWA(string $telepon, string $message, string $userKey, string $apiKey)
    {
        $url = 'https://console.zenziva.net/wareguler/api/sendWA/';

        $data = array(
            'userkey' => $userKey,
            'passkey' => $apiKey,
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

    public function sendImage(string $telepon, string $image_link, string $caption, string $userKey, string $apiKey)
    {
        $url = 'https://console.zenziva.net/wareguler/api/sendWAFile/';

        $data = array(
            'userkey' => $userKey,
            'passkey' => $apiKey,
            'to' => $telepon,
            'link' => $image_link,
            'caption' => $caption
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

        $responseData = curl_exec($curlHandle);

        if (curl_errno($curlHandle)) {
            return curl_error($curlHandle);
        }

        curl_close($curlHandle);

        return $responseData;
    }
}
