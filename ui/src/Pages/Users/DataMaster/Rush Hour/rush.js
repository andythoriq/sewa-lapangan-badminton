import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import FormSelect from "../../../../Components/Form/select";
import FormSelectTime from "../../../../Components/Form/selectTime";
import axios from "../../../../api/axios";
import Swal from "sweetalert2";

const Rush = () => {
  const [courts, setCourts] = useState([])
  const [errors, setErrors] = useState([])
  const [values, setValues] = useState({ court_id: "", start:"", finish:"" });
  const onChange = (e) => {
    setValues({ ...values, [ e.target.name ]: e.target.value });
  }

  useEffect(() => {
    axios.get('/api/court', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data }) => {

        setCourts(data);
      })
      .catch((e) => {
        console.log(e)
      });
  }, [])

  const handleSubmitClick = async (e) => {
    e.preventDefault()
    const data = {
      court_id: values.court_id,
      start: values.start,
      finish: values.finish
    }
    console.log(data)
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      await axios.get('/sanctum/csrf-cookie')
      let response
      // if (id > 0) {
      //   response = await axios.put('/api/peak-time/' + id, data, config)
      // } else {
      //   response = await axios.post('/api/peak-time', data, config);
      // }
      response = await axios.post('/api/peak-time', data, config);
      setErrors('');
      Swal.fire({ icon: "success", title: "Success!", html: response.data.message, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
      setTimeout(function () {
        window.location.href = "/user-management/user-list";
      }, 2000);
    } catch (e) {
      setErrors(e.response.data.errors)
    }
  }

  return (
    <>
      <h4 className="mb-4">
        <b>Rush Hour</b>
      </h4>
      <Row>
        <Col className="col-12 col-sm-6 m-auto">
          <Card className="p-4 mt-5">
            <Form>
              <Row>
                <Col className="col-6 col-md-6">
                  <Form.Label>User role</Form.Label>
                  <Form.Select name="court_id" className="form-select form-select-sm" onChange={onChange}>
                    <option value="">-- courts --</option>
                    {courts.map((role) => <option key={role.id} value={role.id}>{role.label}</option>)}
                  </Form.Select>
                  {errors.court_id &&
                    <span className="text-danger">{errors.court_id[ 0 ]}</span>}
                </Col>
                <Col className="col-12 col-md-8">
                  <FormSelectTime name="start" label="Start" nameHour="start_hour" nameMinute="start_minute" nameTime="start_time" onChange={onChange} />
                  {errors.start &&
                    <span className="text-danger">{errors.start[ 0 ]}</span>}
                </Col>
                <Col className="col-12 col-md-8">
                  <FormSelectTime name="finish" label="Finish" nameHour="finish_hour" nameMinute="finish_minute" nameTime="finish_time" onChange={onChange} />
                  {errors.finish &&
                    <span className="text-danger">{errors.finish[ 0 ]}</span>}
                </Col>
                <Col className="mt-5 mb-4">
                  <button onClick={handleSubmitClick} type="button" className="btn btn-danger btn-sm">
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
