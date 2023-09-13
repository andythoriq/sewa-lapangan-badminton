import React from "react";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import FormSelect from "../../../Components/Form/select";
import FormSelectTime from "../../../Components/Form/selectTime";

const RushHour = () => {
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
      <Container>
        <Form>
          <Row>
            <Card>
              <Col className="col-12 col-md-6">
                <FormSelect name="court" label="Court" className="form-select form-select-sm" options={dataCourt} />
              </Col>
              <Col className="col-12 col-md-6">
                <FormSelectTime label="Start Time" nameHour="start_hour" nameMinute="start_minute" nameTime="start_time" />
              </Col>
              <Col className="col-12 col-md-6">
                <FormSelectTime label="End Time" nameHour="end_hour" nameMinute="end_minute" nameTime="end_time" />
              </Col>
              <Col className="col-12 text-right mt-4">
                <button type="button" className="btn btn-danger btn-sm me-md-6">
                  Save
                </button>
              </Col>
            </Card>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default RushHour;
