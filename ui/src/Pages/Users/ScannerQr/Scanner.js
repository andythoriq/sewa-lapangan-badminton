import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState } from "react";
const Scanner = () => {

  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width:250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }
    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <>
      <div>
        <h1 style={{ fontSize: "30px"}} className="fw-bold mt-3">QR Code Scanner</h1>
        { scanResult
        ?   <div>success: <a href={scanResult}>{scanResult}</a></div>
        : <div id="reader"></div>
        }
      </div>
    </>
  );
};

export default Scanner;