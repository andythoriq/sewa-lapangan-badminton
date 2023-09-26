import React, { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { logoApp, namaApp } from "../../../Components/Services/config";
import FormInput from "../../../Components/Form/input";
import PhoneInput from "react-phone-input-2";
import axios from "../../../api/axios";
import NavbarPublic from "../../../Components/NavbarPublic";
import FooterPublic from "../../../Components/FooterPublic";

const FormStep = () => {
  const [values, setValues] = useState({ fullname: "", phonenumber: "" });
  const [errors, setErrors] = useState({});

  const inputs = [
    {
      id: 1,
      label: "Full name",
      name: "fullname",
      type: "text",
      placeholder: "input full name",
      errorMessage: errors.fullname,
    },
    {
      id: 2,
      label: "Phone number",
      name: "phonenumber",
      type: "text",
      placeholder: "input phone number",
      errorMessage: errors.phonenumber,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!values.fullname.trim()) validationErrors.fullname = "Full name required";
    if (!values.phonenumber.trim()) validationErrors.phonenumber = "Phone number required";

    console.log(validationErrors);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.get("/sanctum/csrf-cookie");
        await axios.post("/api/register", {
          name: values.fullname,
          phone_number: values.phonenumber,
        });
        setValues({ phone_number: "", fullname: "" });
        setTimeout(function () {
          // window.location.href = "/";
          window.location.href = "/step2";
          // window.location.href = "/login";
        }, 2000);
      } catch (e) {
        if (e?.response?.status === 422) {
          // setErrors(e.response.data.errors)
          console.log(e.response.data.errors);
        }
      }
      //  localStorage.setItem("token", "abcd12345");
      //  localStorage.setItem("phonenumber", values.phonenumber);
      //   setTimeout(function () {
      //      window.location.href = "/";
      //    }, 2000);
    }
  };

  const onChange = (e) => {
    setErrors({});
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavbarPublic />
      <Container className="regis pt-5 pb-5">
        <Card className="bgRegis mt-5">
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
                <b className="text-heading" style={{ fontSize: 25 }}>
                  New Sport
                  <br />
                  Experience.
                </b>
                {/* <p>Create your account now</p> */}
                <br />
                <br />
                <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <Form.Group className="mb-2">
                    <FormInput type="text" name="name" label="Full name" value={values.name} placeholder="input full name" onChange={onChange} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <label>Phone Number</label>
                    <PhoneInput specialLabel={""} country={"id"} placeholder="input phone number"/>
                  </Form.Group>

                  {/* <Button type="submit" className="btn-danger btn-sm btn-block col-12 mt-2 rounded" href="/step2">
                  Next
                </Button> */}
                  <Button type="submit" className="btn-danger btn-sm btn-block col-12 mt-2 rounded">
                    Register
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
      <FooterPublic style={{ marginTop: "100px" }} />
    </>
  );
};

export default FormStep;
