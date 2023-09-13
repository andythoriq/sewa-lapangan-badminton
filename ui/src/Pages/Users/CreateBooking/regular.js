import React from 'react'
import { Form, Row, Col } from "react-bootstrap";
import FormSelect from '../../../Components/Form/select';
import FormSelectTime from '../../../Components/Form/selectTime';

const CreateBookingFormRegular = () => {
  
  let dataCustomer = [
    {value:"", label:""},
    {value:"1", label:"siti"},
    {value:"2", label:"reza"},
    {value:"3", label:"trian"},
    {value:"4", label:"mike"},
    {value:"5", label:"tono"},
    {value:"6", label:"yosline"},
  ];

  let dataCourt = [
    {value:"", label:""},
    {value:"1", label:"Court A"},
    {value:"2", label:"Court B"},
    {value:"3", label:"Court C"},
    {value:"4", label:"Court D"},
  ];

  return (
    <>
    <Form>
      <Row>
        <Col className="col-12 col-md-6">
            <FormSelect
                name="customer"
                label="Customer"
                className="form-select form-select-sm"
                options={dataCustomer}
            />
        </Col>
        <Col className="col-12 col-md-6">
            <FormSelect
                name="court"
                label="Court"
                className="form-select form-select-sm"
                options={dataCourt}
            />
        </Col>
        <Col className="col-12 col-md-6">
            <FormSelectTime
              label="Start Time"
              nameHour="start_hour"
              nameMinute="start_minute"
              nameTime="start_time"
            />
        </Col>
        <Col className="col-12 col-md-6">
            <FormSelectTime
              label="End Time"
              nameHour="end_hour"
              nameMinute="end_minute"
              nameTime="end_time"
            />
        </Col>
        <Col className="col-12 col-md-6 mt-3 text-center">
            <b>Totally hour:</b>
            <br/>
            <br/>
            <br/>
            ...
        </Col>
        <Col className="col-12 col-md-6 mt-3 text-center">
            <b>Totally price:</b>
            <br/>
            <br/>
            <br/>
            ...
        </Col>
        <Col className="col-12 text-right mt-4">
            <button type="button" className="btn btn-danger btn-sm me-md-4">
                Booking
            </button>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default CreateBookingFormRegular;