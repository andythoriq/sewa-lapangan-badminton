import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import FormInput from "../Form/input";

const FormRegularBooking = ({ isShow, handleClose, court_id }) => {
  const [ values, setValues ] = useState({ start: "", finish: "" });
  const onChange = (e) => {
    setValues({ ...values, [ e.target.name ]: e.target.value });
  };



  return (<Modal show={isShow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Booking</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      <Form className="mt-3" style={{ marginBottom: "10%" }}>
        <Row>
          <Col className="col-12 col-md-3 col-lg-3"></Col>
          <Col className="col-12 col-md-3 col-lg-3 text-center mb-4">
            <b>Customer</b>
            <br />
            <br />
            ...
          </Col>
          <Col className="col-12 col-md-3 col-lg-3"></Col>
          <Col className="col-12 col-md-3 col-lg-3 text-center">
            <b>Court</b>
            <br />
            <br />
            ...
          </Col>
          <Col className="col-12"></Col>
          <Col className="col-12 col-md-1 col-lg-1"></Col>
          <Col className="col-6 col-md-2">
            <FormInput type="datetime-local" name="start" label="Start" value={values.start} onChange={onChange} />
          </Col>
          <Col className="col-6 col-md-2">
            <FormInput type="datetime-local" name="finish" label="Finish" value={values.finish} onChange={onChange} />
          </Col>
          <Col className="col-12 col-md-3 mt-3 text-center">
            <b>Totally hour:</b>
            <br />
            <br />
            ...
          </Col>
          <Col className="col-12 col-md-3 mt-3 text-center">
            <b>Totally price:</b>
            <br />
            <br />
            ...
          </Col>
          <Col className="col-12 text-right mt-5">
            <button type="button" className="btn btn-danger btn-sm me-md-4">
              Booking
            </button>
          </Col>
        </Row>
      </Form>
    </Modal.Body>
  </Modal>)
}

export default FormRegularBooking;