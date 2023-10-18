import React, { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { logoApp, namaApp } from "../../../Components/Services/config";
import OTPInput from "otp-input-react";
import Swal from "sweetalert2";
// import NavbarPublic from "../../../Components/NavbarPublic";
// import FooterPublic from "../../../Components/FooterPublic";
// import { ArrowLeft } from "react-bootstrap-icons";
// import { Link } from "react-router-dom";
import "../nav.css";
import axios from "../../../api/axios";
import secureLocalStorage from "react-secure-storage";
import { useGeneralContext } from "../../../context/generalContext";

const Step2 = () => {
  const {resendPhoneNumber, expiration, setExpiration} = useGeneralContext()
  const [OTP, setOTP] = useState('');
  const [errors, setErrors] = useState([])

  const inputs = [
    {
      id: 1,
      label: "Code OTP",
      name: "otp_code",
      type: "text",
      errorMessage: errors.otp_code,
    }
  ];

  const handleResendOTP = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.post("/api/send-opt", { phone_number: resendPhoneNumber});
      setErrors('')
      if (data.response.text === "Success") {
        Swal.fire({ icon: "success", title: "Success!", html: `OTP code has been resent to ${data.response.to} <br/> `, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 1500 });
        setExpiration(data.expiration)
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: data.response.text, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
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

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
   try {
     await axios.get("/sanctum/csrf-cookie")
     const { data } = await axios.post("/api/verify-otp", { otp_code: OTP })
     setErrors('')
     secureLocalStorage.clear()
     secureLocalStorage.setItem('token', data.token)
     secureLocalStorage.setItem('phone_number', data.customer.phone_number)
     secureLocalStorage.setItem('membership_status', data.customer.membership_status)
     secureLocalStorage.setItem('customer_code', data.customer.customer_code)
     secureLocalStorage.setItem('name',data.customer.name)
     secureLocalStorage.setItem('role', 'user')
     secureLocalStorage.setItem('expiration', data.customer.expiration)
     Swal.fire({ icon: "success", title: "Success!", html: "OTP verified successfully", showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
     setTimeout(function () {
      //  navigate('/landing-page', { replace: true })
       window.location.href = 'landing-page';
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
    <div style={{ backgroundColor: "#F5F5F5" }}>
    <Container className="regis pt-5 pb-5 m-auto"  style={{ height: "100vh" }}>
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
            <div className="position-relative top-50 start-50 translate-middle p-4">
              <div className="d-md-none d-md-block text-center mb-2">
                <img src={`/${logoApp}`} alt="" width={100} />
              </div>
              {/* <div className="back" style={{ width: "50px" }}>
                  <Link to="/step2" className="btnBack">
                    <ArrowLeft/>
                  </Link>
                </div> */}
              <b className="text-heading" style={{ fontSize: 25 }}>
                Check your inbox!
              </b>
              <p style={{fontSize:13}}>We are sending an phone<br/>numberverification code to WhatsApp please enter the code.</p>
              <Form onSubmit={handleVerifyOTP} style={{ width: "100%" }}>
                {inputs.map((input, index) => (
                  <Form.Group className="mb-3 mt-2 m-2" key={index}>
                    <OTPInput value={OTP} onChange={setOTP}  OTPLength={6} otpType="number" />
                  </Form.Group>
                ))}
                {errors.otp_code && <span className="text-danger">{errors.otp_code[0]}</span>}
                <Button type="submit" className="btn btn-sm btn-block col-12 mt-2 rounded"  style={{ background: "#B21830", color: "white" }}>
                  Submit
                </Button>
                    <div onClick={() => {
                      Swal.fire({ icon: "warning", title: "Are you sure to resend the code?", html: `You can only resend in ${expiration.resend_limit > 1 ? expiration.resend_limit + ' times' : expiration.resend_limit + ' time' } <br /> You've tried ${expiration.recent_resend > 1 ? expiration.recent_resend + ' times' : expiration.recent_resend + ' time' }`, showConfirmButton: true, showCancelButton: true, allowOutsideClick: false, allowEscapeKey: false}).then(result => {
                        if(result.isConfirmed){
                          handleResendOTP()
                        }
                      })
                    }} className="mt-2" style={{ float: "right"}}><span style={{ color: 'dodgerblue', textDecoration: "none", cursor: 'pointer' }}>Resend OTP</span> <span>{expiration.recent_resend}x</span></div>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
    </div>
    </>
  );
};

export default Step2;
