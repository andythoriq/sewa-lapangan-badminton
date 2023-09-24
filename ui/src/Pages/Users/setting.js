import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../Components/Form/input";
import FormTextarea from "../../Components/Form/textarea";

const Setting = () => {
  const [values, setValues] = useState({ label: "", price: "" });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return (
    <>
      <h4 className="mb-2">
        <b>Setting</b>
      </h4>
      <Row>
        <Col className="col-12 col-sm-10 col-md-10 m-auto">
          <Card className="p-3 mt-2">
            <Container>
              <Row className="px-2 my-1">
                <Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Number WhatsApp</label>
                      <FormInput type="text" name="number" value={values.name} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-2">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Email</label>
                      <FormInput type="text" name="email" value={values.name} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-2">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Address</label>
                      <FormTextarea name="address" value={values.description} onChange={onChange} style={{ height: "65px" }} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 mt-2">
                    <label style={{ fontSize: "18px" }}>Open Days</label>
                    <Form.Select name="day_name" className="form-select form-select-sm" onChange={onChange}>
                      {dayNames.map((name) => (
                        <option key={name} value={name}>
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col className="col-12 mt-2">
                    <label style={{ fontSize: "18px" }}>Opening hours</label>
                    <FormInput type="time" name="start" value={values.start} onChange={onChange} />
                    <span className="text-danger"></span>
                  </Col>
                  <Col className="col-12 text-right mt-4">
                    <button type="button" className="btn btn-danger btn-sm me-md-6">
                      Save Change
                    </button>
                  </Col>
                </Col>
              </Row>
            </Container>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Setting;
