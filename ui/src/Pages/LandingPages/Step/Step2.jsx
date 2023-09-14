import React, { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { logoApp, namaApp } from "../../../Components/Services/config";
import FormInput from "../../../Components/Form/input";
import Swal from "sweetalert2";

const Step2 = () => {
  const [values, setValues] = useState({ Verification: "" });
  const [errors, setErrors] = useState({});

  const inputs = [
    {
      id: 1,
      label: "Verification",
      name: "verifikasi",
      type: "text",
      errorMessage: errors.verifikasi,
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!values.verifikasi.trim()) validationErrors.verifikasir = "Verification required";

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
    <Container className="login pt-5 pb-5">
      <Card className="bgLogin shadow">
        <Row>
          <Col className="col-sm-6 px-0 d-none d-md-block divLeft position-relative">
            <div className="position-relative top-50 start-50 translate-middle p-4">
              <img src={`/${logoApp}`} alt="" width={30} style={{ marginTop: -10 }} />
              <b style={{ paddingLeft: 5, fontSize: 20 }}>{namaApp}</b>
              <div className="text-danger mt-4 text-heading">Management Booking</div>
              <div className="mb-3 text-heading">Field Badminton</div>
              <div style={{ fontSize: 12 }}>
                BFB provides various features that support the operational
                <br />
                management of yout Badminton sport facility
              </div>
            </div>
          </Col>
          <Col className="col-12 col-md-6 text-white divRight position-relative p-5">
            <div className="position-relative top-50 start-50 translate-middle p-4">
              <div className="d-md-none d-md-block text-center mb-2">
                <img src={`/${logoApp}`} alt="" width={100} />
              </div>
              <b className="text-heading" style={{ fontSize: 29 }}>
                Get started
              </b>
              <p>Verification your account now</p>
              <br />
              <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {inputs.map((input) => (
                  <Form.Group key={input.id} className="mb-2">
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} icon={input.icon} />
                  </Form.Group>
                ))}
                <Button type="submit" className="btn-danger btn-sm btn-block col-12 mt-2 rounded">
                  Created
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Step2;
