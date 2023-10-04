import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import FormInput from "../../../Components/Form/input";
import { Form, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
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
        <h1 style={{ fontSize: "30px"}} className="fw-bold mt-2 mb-3">QR Code Scanner</h1>
        <Col className="col-12 col-lg-6">
            <Form.Group className="mb-3">
                <FormInput type="text" label="Input Code QR" />
            </Form.Group>
        </Col>
        { scanResult
        ?   <div className="mt-2">success: <Link href={scanResult}>{scanResult}</Link></div>
        :   <div id="reader"></div>
        }
      </div>
    </>
  );
};

export default Scanner;
