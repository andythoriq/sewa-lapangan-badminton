import React, { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { logoApp, namaApp } from "../../../Components/Services/config";
import OTPInput from "otp-input-react";
import Swal from "sweetalert2";
import NavbarPublic from "../../../Components/NavbarPublic";
import FooterPublic from "../../../Components/FooterPublic";
import "../nav.css";

const Step2 = () => {
  const [OTP, setOTP] = useState("");
  const [values] = useState({ verifikasi: "" });
  const [errors, setErrors] = useState({});

  const inputs = [
    {
      id: 1,
      label: "Code OTP",
      name: "verifikasi",
      type: "text",
      errorMessage: errors.verifikasi,
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!values.verifikasi.trim()) validationErrors.verifikasi = "Code OTP required";

    // console.log(validationErrors);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("role", "user");
      localStorage.setItem("token", "abcd12345");
      localStorage.setItem("verifikasi", values.verifikasi);
      Swal.fire({ icon: "success", title: "Success!", html: "successfully", showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
      setTimeout(function () {
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <>
    <NavbarPublic/>
    <Container className="regis pt-5 pb-5">
      <Card className="bgRegis">
        <Row>
          <Col className="col-sm-6 px-0 d-none d-md-block divLeft position-relative">
            <div className="position-relative top-50 start-50 translate-middle p-4">
              <img src={`/${logoApp}`} alt="" width={30} style={{ marginTop: -10 }} />
              <b style={{ paddingLeft: 5, fontSize: 20 }}>{namaApp}</b>
              <div className="text-danger mt-4 text-heading">Management Booking</div>
              <div className="mb-3 text-heading">Court Badminton</div>
              <div style={{ fontSize: 12 }}>
                BFB provides various features that support the operational
                <br />
                management of yout Badminton sport facility
              </div>
            </div>
          </Col>
          <Col className="col-12 col-md-6 text-black divRight position-relative p-5">
            <div className="position-relative top-50 start-50 translate-middle p-3">
              <div className="d-md-none d-md-block text-center mb-2">
                <img src={`/${logoApp}`} alt="" width={100} />
              </div>
              <b className="text-heading" style={{ fontSize: 25 }}>
                Check your inbox!
              </b>
              <p style={{fontSize:13}}>We are sending an phone<br/>numberverification code to WhatsApp please enter the code.</p>
              <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {inputs.map((input) => (
                  <Form.Group className="mb-3">
                    <OTPInput value={OTP} onChange={setOTP}  OTPLength={6} otpType="number" />
                  </Form.Group>
                ))}
                <Button type="submit" className="btn-danger btn-sm btn-block col-12 mt-2 rounded m-2" >
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
    <FooterPublic/>
    </>
  );
};

export default Step2;
