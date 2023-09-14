import React, { useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../../Components/Form/input";

const CustomerMember = () => {
  const [values, setValues] = useState({ label: "", price: "" });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h4 className="mb-4">
        <b>Customer Member</b>
      </h4>
      <Row>
        <Col className="col-12 col-sm-8 col-md-6 m-auto">
          <Card className="p-3 mt-5 mb-2">
            <Form>
              <Row>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="text" name="name" label="Name" value={values.name} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="text" name="no" label="No" value={values.no} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="date" name="start" label="Active period" value={values.start} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="text" name="deposit" label="Deposit" value={values.depdepositt} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="text" name="dept" label="Dept" value={values.dept} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto text-right pt-3">
                  <button type="button" className="btn btn-danger">
                    Save
                  </button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CustomerMember;
