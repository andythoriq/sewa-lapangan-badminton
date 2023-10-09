import React, { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { logoApp, namaApp } from "../../../Components/Services/config";
import OTPInput from "otp-input-react";
import Swal from "sweetalert2";
import NavbarPublic from "../../../Components/NavbarPublic";
import FooterPublic from "../../../Components/FooterPublic";
import "../nav.css";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Step2 = () => {
  const [OTP, setOTP] = useState('');
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const inputs = [
    {
      id: 1,
      label: "Code OTP",
      name: "otp_code",
      type: "text",
      errorMessage: errors.otp_code,
    }
  ];

  // if (errors.otp_code) {
  //   inputs[0].errorMessage = errors.otp_code[0]
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
     await axios.get("/sanctum/csrf-cookie")
     const { data } = await axios.post("/api/verify-otp", { otp_code: OTP })
     setErrors('')
     secureLocalStorage.setItem('token', data.token)
     secureLocalStorage.setItem('phone_number', data.customer.phone_number)
     secureLocalStorage.setItem('membership_status', data.customer.membership_status)
     secureLocalStorage.setItem('customer_code', data.customer.customer_code)
     secureLocalStorage.setItem('name',data.customer.name)
     secureLocalStorage.setItem('role', 'user')
     Swal.fire({ icon: "success", title: "Success!", html: "OTP verified successfully", showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
     setTimeout(function () {
       navigate('/landing-page', { replace: true })
     }, 2000);
   } catch (e) {
     if (e?.response?.status === 422) {
       setErrors(e.response.data.errors);
     } else if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
       Swal.fire({ icon: "error", title: "Error!", html: e.response.data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false, });
     } else {
       Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
     }
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
                {inputs.map((input, index) => (
                  <Form.Group className="mb-3" key={index}>
                    <OTPInput value={OTP} onChange={setOTP}  OTPLength={6} otpType="number" />
                  </Form.Group>
                ))}
                {errors.otp_code && <span className="text-danger">{errors.otp_code[0]}</span>}
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
