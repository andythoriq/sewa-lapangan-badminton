import React, { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { logoApp, namaApp } from "../../../Components/Services/config";
import FormInput from "../../../Components/Form/input";
import PhoneInput from "react-phone-input-2";
import axios from "../../../api/axios";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
// import NavbarPublic from "../../../Components/NavbarPublic";
// import FooterPublic from "../../../Components/FooterPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormStep = () => {
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const inputs = [
    {
      id: 1,
      label: "Full name",
      name: "name",
      type: "text",
      placeholder: "input full name",
      errorMessage: errors.name,
    },
    {
      id: 2,
      label: "Phone number",
      name: "phone_number",
      type: "text",
      placeholder: "input phone number",
      errorMessage: errors.phone_number,
    },
  ];

  // if (errors.name) {
  //   inputs[ 0 ].errorMessage = errors.name[ 0 ];
  // }

  // if (errors.phone_number) {
  //   inputs[ 1 ].errorMessage = errors.phone_number[ 0 ];
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/sanctum/csrf-cookie");
      const {data} = await axios.post("/api/send-opt", {
        name: name,
        phone_number: (phoneNumber.substring(0, 2) === '62' ? "0" + phoneNumber.slice(2) : phoneNumber),
      });
      setErrors('')
      if (data.text === "Success") {
        Swal.fire({ icon: "success", title: "Success!", html: `OTP code has been sent to ${data.to}`, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false }).then((result) => {
          if (result.isConfirmed) {
            navigate('/step2', { replace: true })
          }
        });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: data.text, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    } catch (e) {
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors);
      } else if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        Swal.fire({ icon: "error", title: "Error!", html: e.response.data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false,});
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  };


  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5" }}>
      <Container className="regis pt-5 pb-5" style={{  height: "100vh", borderRadius: "30px" }}>
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
                <div className="back" style={{ width: "50px" }}>
                  <Link to="/landing-page" className="btnBack">
                    <ArrowLeft/>
                  </Link>
                </div>
                <b className="text-heading" style={{ fontSize: 30 }}>
                  New Sport
                  <br />
                  Experience.
                </b>
                {/* <p>Create your account now</p> */}
                <br />
                <br />
                <Form onSubmit={handleSubmit} style={{ width: "120%" }}>
                  <Form.Group className="mb-2">
                    <FormInput type="text" name="name" label="Full name" value={name} placeholder="required if the account is new" onChange={(e) => setName(e.target.value)} />
                    {errors.name && <span className="text-danger">{errors.name[ 0 ]}</span>}
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <label>Phone Number</label>
                    <PhoneInput placeholder="input phone number" specialLabel={""} country={"id"} value={(phoneNumber.substring(0, 1) === '0' ? "62" + phoneNumber.slice(1) : phoneNumber)} onChange={(phone) => setPhoneNumber(phone)} />
                    {errors.phone_number && <span className="text-danger">{errors.phone_number[0]}</span>}
                  </Form.Group>

                  {/* <Button type="submit" className="btn-danger btn-sm btn-block col-12 mt-2 rounded" href="/step2">
                  Next
                </Button> */}
                  <Button type="submit" className="btn-danger btn-sm btn-block col-12 mt-2 rounded">
                    Send OTP
                  </Button>
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

export default FormStep;
