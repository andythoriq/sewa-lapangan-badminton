import React, { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import FormSelect from "../../../../Components/Form/select";
import FormInput from "../../../../Components/Form/input";

const Rush = () => {
  let dataCourt = [
    { value: "", label: "" },
    { value: "1", label: "Court A" },
    { value: "2", label: "Court B" },
    { value: "3", label: "Court C" },
    { value: "4", label: "Court D" },
  ];

  const [values, setValues] = useState({ court: "", start_time:"", end_time:"" });
  const onChange = (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h4 className="mb-4">
        <b>Rush Hour</b>
      </h4>
      <Row>
        <Col className="col-sm-6 m-auto">
          <Card className="p-4 mt-5">
            <Form>
              <Row>
                <Col className="col-12">
                  <FormSelect name="court" label="Court" className="form-select form-select-sm" options={dataCourt} selected={values.court} onChange={onChange} />
                </Col>
                <Col className="col-6 col-md-3">
                  <FormInput type="time" name="start_time" label="Start" value={values.start_time} onChange={onChange} />
                </Col>
                <Col className="col-6 col-md-3">
                  <FormInput type="time" name="end_time" label="End" value={values.end_time} onChange={onChange} />
                </Col>
                <Col className="col-12 mt-5 mb-4 text-center">
                  <button type="button" className="btn btn-danger btn-sm">
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

export default Rush;
