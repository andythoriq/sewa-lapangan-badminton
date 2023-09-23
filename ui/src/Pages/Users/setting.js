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
                <Col >
                  <Col className="col-12 col-sm-8 col-md-12 m-auto">
                    <Form.Group>
                      <FormInput type="text" name="number" label="Number WhatsApp" value={values.name} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-4">
                    <Form.Group>
                      <FormInput type="text" name="email" label="Email" value={values.name} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-4">
                    <Form.Group>
                      <FormTextarea name="address" label="Address" value={values.description} onChange={onChange} style={{ height: "65px" }} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-4">
                    <Form.Group>
                      <FormInput type="date" name="opendays" label="Open Days" value={values.start} onChange={onChange} />
                    </Form.Group>
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
