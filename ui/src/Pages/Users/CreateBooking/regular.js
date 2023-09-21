import React, { useState } from 'react'
import { Form, Row, Col } from "react-bootstrap";
import FormSelect from '../../../Components/Form/select';
import FormInput from '../../../Components/Form/input';

const CreateBookingFormRegular = () => {
  
  let dataCustomer = [
    {value:"", label:""},
    {value:"1", label:"siti"},
    {value:"2", label:"reza"},
    {value:"3", label:"trian"},
  ];

  let dataCourt = [
    {value:"", label:""},
    {value:"1", label:"Court A"},
    {value:"2", label:"Court B"},
    {value:"3", label:"Court C"},
    {value:"4", label:"Court D"},
  ];

  const [values, setValues] = useState({ customer: "", court: "", start_time:"", end_time:"" });
  const onChange = (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    console.log(values);
  }

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
                selected={values.customer}
                onChange={onChange} 
            />
        </Col>
        <Col className="col-12 col-md-6">
            <FormSelect
                name="court"
                label="Court"
                className="form-select form-select-sm"
                options={dataCourt}
                selected={values.court}
                onChange={onChange} 
            />
        </Col>
        <Col className="col-6 col-md-3">
          <FormInput type="time" name="start_time" label="Start" value={values.start_time} onChange={onChange} />
        </Col>
        <Col className="col-6 col-md-3">
          <FormInput type="time" name="end_time" label="End" value={values.end_time} onChange={onChange} />
        </Col>
        <Col className="col-12"></Col>
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
            <button type="button" className="btn btn-danger btn-sm me-md-4" onClick={onSubmit}>
                Booking
            </button>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default CreateBookingFormRegular;