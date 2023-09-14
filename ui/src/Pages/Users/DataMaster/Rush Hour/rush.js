import React from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import FormSelect from "../../../../Components/Form/select";
import FormSelectTime from "../../../../Components/Form/selectTime";

const Rush = () => {
  let dataCourt = [
    { value: "", label: "" },
    { value: "1", label: "Court A" },
    { value: "2", label: "Court B" },
    { value: "3", label: "Court C" },
    { value: "4", label: "Court D" },
  ];
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
                <Col className="col-6 col-md-6">
                  <FormSelect name="court" label="Court" className="form-select form-select-sm" options={dataCourt} />
                </Col>
                <Col className="col-12 col-md-8">
                  <FormSelectTime label="Start" nameHour="start_hour" nameMinute="start_minute" nameTime="start_time" />
                </Col>
                <Col className="col-12 col-md-8">
                  <FormSelectTime label="End" nameHour="end_hour" nameMinute="end_minute" nameTime="end_time" />
                </Col>
                <Col className="mt-5 mb-4">
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
