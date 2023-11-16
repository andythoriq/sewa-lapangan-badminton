import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "../../api/axios";
import { Col, Form, Row } from "react-bootstrap";
import Datetime from "react-datetime";
import FormInput from "../Form/input";


const FormUpdateStartFinish = ({ isShow, handleClose, dataBefore, booking, swal, setChangeStatus, changeStatus, handleCheckDetail }) => {

  const [ values, setValues ] = useState({ start: "", finish: "", date: "" });
  const [ errors, setErrors ] = useState([]);
  const [ totalHours, setTotalHours ] = useState(0)

  useEffect(() => {
    setErrors([])
    setValues({ start: "", finish: "", date: "" })
    setTotalHours(0)
  }, [ isShow ])

  useEffect(() => {
    if (values.start && values.finish) {
      const [ startHours, startMinutes ] = values.start.split(':').map(Number);
      const [ finishHours, finishMinutes ] = values.finish.split(':').map(Number);

      let diffHours = finishHours - startHours;
      let diffMinutes = finishMinutes - startMinutes;

      if (diffMinutes < 0) {
        diffHours--;
        diffMinutes += 60;
      }

      const total = diffHours + diffMinutes / 60;

      setTotalHours(total);
    }
  }, [ values.start, values.finish ])

  useEffect(() => {
    if (values.start) {
      const [ hours, minutes ] = values.start.split(':');

      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      date.setSeconds(0);

      date.setHours(date.getHours() + 1);

      const finishHours = String(date.getHours()).padStart(2, '0');
      const finishMinutes = String(date.getMinutes()).padStart(2, '0');

      setValues({ ...values, finish: `${finishHours}:${finishMinutes}` });
    }
  }, [ values.start ])

  const handleChangeTime = (time_name, value) => {
    const hours = String(value.getHours()).padStart(2, '0');
    const minutes = String(value.getMinutes()).padStart(2, '0');

    setValues({ ...values, [ time_name ]: `${hours}:${minutes}` });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.put('/api/rental/' + booking.rentalId, {
      start: (values.start && values.date) ? `${values.date} ${values.start}:00` : '',
      finish: (values.finish && values.date) ? `${values.date} ${values.finish}:00` : '',
      court_id: dataBefore.court_id,
    })
    .then(() => { 
      handleClose() 
      setChangeStatus(!changeStatus)
      if (booking.isCheckDetail) {
        handleCheckDetail(booking.bookingCode)
      }
    })
    .catch((e)=>{
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
      else if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        swal.fire({ icon: "error", title: "Error!", html: e.response.data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      } else {
        swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    })
  }

  return (<Modal show={isShow} onHide={() => {
    handleClose()
  }} centered={true} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Update Start and Finish</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      <h6>{dataBefore.start} - {dataBefore.finish}</h6>
      <Row className="justify-content-evenly">
        <Col className="col-4">
          <FormInput type="date" label="Date" value={values.date} onChange={(e) => setValues({ ...values, date: e.target.value })} min={new Date().toISOString().slice(0, 10)} />
        </Col>
        <Col className="col-4">
          <Form.Label className="mb-1">Start</Form.Label>
          <Datetime
            value={values.start}
            isValidDate={current => current.isSameOrAfter(new Date().setDate(new Date().getDate() - 1))}
            onChange={value => handleChangeTime("start", value._d)}
            dateFormat={false}
            timeFormat="HH:mm"
            timeConstraints={{ minutes: { step: 30 } }}
            inputProps={{ disabled: (!values.date), readOnly: true }}
          />
          {errors.start && <span className="text-danger">{errors.start[ 0 ]}</span>}
        </Col>
        <Col className="col-4">
          <Form.Label className="mb-1">Finish</Form.Label>
          <Datetime
            value={values.finish}
            onChange={value => handleChangeTime("finish", value._d)}
            dateFormat={false}
            timeFormat="HH:mm"
            timeConstraints={{ minutes: { step: 30 } }}
            inputProps={{ disabled: (!values.date), readOnly: true }}
          />
          {errors.finish && <span className="text-danger">{errors.finish[ 0 ]}</span>}
        </Col>
      </Row>
      <Row className="justify-content-between pt-5">
        <div className="col-6">
          <h6>total hours: {totalHours}</h6>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button onClick={handleSubmit} className="btn btn-sm me-md-4" style={{ background: "#B21830", color: "white" }}>Update</button>
        </div>
      </Row>
    </Modal.Body>
  </Modal>)
}

export default FormUpdateStartFinish;