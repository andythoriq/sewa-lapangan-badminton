import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import FormSelect from "../../../Components/Form/select";
import FormInput from "../../../Components/Form/input";
import { Trash3 } from "react-bootstrap-icons";
import "./form.css";

const CreateBookingFormMember = () => {
  let dataCustomer = [
    { value: "1", label: "Siti" },
    { value: "2", label: "Gagah" },
    { value: "3", label: "Surip" },
  ];

  let dataCourt = [
    { value: "1", label: "Court A" },
    { value: "2", label: "Court B" },
    { value: "3", label: "Court C" },
    { value: "4", label: "Court D" },
  ];

  const pluginSelect = 'react-select'

  const BoxRows = ({ rows, boxRowRemove, onValUpdate }) => {
    return rows.map((rowsData, index) => {
      const { court, customer, start_time, end_time } = rowsData;
      const onChange = (e) => {
        // console.log(e.target.value);
        onValUpdate(index, e);
      };
      return (
        <>
          <Row className="m-1 p-2 box-border" key={index}>
            <Col className="col-12 column">
              <Row>
                <Col className="col-12 col-md-4">
                  <FormSelect plugin={pluginSelect} name="court" label="Court" menuPlacement="top" options={dataCourt} selected={court} onChange={(value, event) => onValUpdate(index, event, value)} />
                </Col>
                <Col className="col-12 col-md-4">
                  <FormInput type="datetime-local" name="start_time" label="Start" value={start_time} onChange={onChange} />
                </Col>
                <Col className="col-12 col-md-4">
                  <FormInput type="datetime-local" name="end_time" label="End" value={end_time} onChange={onChange} />
                </Col>
                <Col className="col-12 mt-3 text-right">
                  <button type="button" className="btn btn-danger btn-sm me-md-2 text-white" onClick={() => boxRowRemove(index)}>
                    <Trash3 className="text-white" style={{ marginTop: -5 }} />
                  </button>
                  <button type="button" className="btn btn-danger btn-sm me-md-2" onClick={addRowBox}>
                    + Add
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      );
    });
  };

  const dataDefault = { court: "", customer: "", start_time: "", end_time: "" };
  const [rows, initRow] = useState([dataDefault]);
  const addRowBox = () => {
    initRow([...rows, dataDefault]);
  };
  const boxRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };
  const onValUpdate = (i, event, valueSel = []) => {
    if (valueSel.value) {
      const name = event.name;
      const value = valueSel;
      const data = [...rows];
      data[i][name] = value;
      initRow(data);
    } else {
      const { name, value } = event.target;
      const data = [...rows];
      data[i][name] = value;
      // initRow(data);
    }
  };

  const onSubmit = () => {
    console.log(rows);
  };

  return (
    <>
      <Form>
        <Col className="m-2 col-12 col-md-4 mb-3">
          <FormSelect plugin={pluginSelect} name="customer" label="Customer" menuPlacement="top" options={dataCustomer} />
        </Col>
        <BoxRows rows={rows} boxRowRemove={boxRowRemove} onValUpdate={onValUpdate} />
        <Row>
          <Col className="col-12 col-md-1"></Col>
          <Col className="col-12 col-md-3 mt-3 text-center">
            <b>Totally hour:</b>
            <br />
            <br />
            <br />
            ...
          </Col>
          <Col className="col-12 col-md-3 mt-3 text-center">
            <b>Totally price:</b>
            <br />
            <br />
            <br />
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
  );
};

export default CreateBookingFormMember;
