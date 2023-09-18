import React, { useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";

const CustomerRegular = () => {
  const { id } = useParams();
  const [values, setValues] = useState({ Name: "", No: "" });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h4>
        <b>
          <Link to="/data-master/regular" className="btnBack">
            <ArrowLeft />
          </Link>
          {id ? "Edit" : "Create"} Customer Regular
        </b>
      </h4>
      <Row>
        <Col className="col-12 col-sm-8 col-md-6 m-auto">
          <Card className="p-3 mt-5">
            <Form>
              <Row>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <FormInput type="text" name="name" label="Name" value={values.name} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <FormInput type="text" name="no" label="No" value={values.no} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <FormInput type="date" name="start" label="Active period" value={values.activeperiod} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <FormInput type="text" name="deposit" label="Deposit" value={values.deposit} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <FormInput type="text" name="dept" label="Dept" value={values.dept} onChange={onChange} />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <label>Status</label>
                  <div className="d-flex">
                    <div className="form-check">
                      <input type="radio" className="form-check-input" name="radionExam" />
                      <label>Active</label>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="form-check form-check-inline">
                      <input type="radio" className="form-check-input" name="radionExam" />
                      <label>In active</label>
                    </div>
                  </div>
                </Col>
                <Col className="col-12 text-right pt-3">
                  <button type="button" className="btn btn-danger me-md-4">
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

export default CustomerRegular;
