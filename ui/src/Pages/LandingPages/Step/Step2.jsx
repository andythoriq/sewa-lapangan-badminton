import React, { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { logoApp, namaApp } from "../../../Components/Services/config";
import FormInput from "../../../Components/Form/input";
import Swal from "sweetalert2";
import NavbarPublic from "../../../Components/NavbarPublic";
import FooterPublic from "../../../Components/FooterPublic";
import "../nav.css";

const Step2 = () => {
  const [values, setValues] = useState({ verifikasi: "" });
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

  const onChange = (e) => {
    setErrors({});
    setValues({ ...values, [e.target.name]: e.target.value });
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
              <p style={{fontSize:13}}>We are sending an phone<br/>numbererification code to WhatsApp<br/>please enter the code. - <b class="text-danger">BFB</b></p>
              <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {inputs.map((input) => (
                  <Form.Group key={input.id} className="mb-2">
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} icon={input.icon} />
                  </Form.Group>
                ))}
                <Button type="submit" className="btn-danger btn-sm btn-block col-12 mt-2 rounded" >
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
