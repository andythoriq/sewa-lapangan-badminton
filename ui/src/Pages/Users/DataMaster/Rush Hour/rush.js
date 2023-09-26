import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import axios from "../../../../api/axios";
import Swal from "sweetalert2";
import { Link, useParams} from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

const Rush = () => {
  const { id } = useParams();
  const [ values, setValues ] = useState({ start: "", finish: "", price_increase: "", day_name: "" });
  const [ courts, setCourts ] = useState([])
  const [ errors, setErrors ] = useState([])

  const [ courtId, setCourtId ] = useState('')
  const [ initialPrice, setInitialPrice ] = useState('')

  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const onChangeSelectCourt = (e) => {
    const selected = e.target.value;
    if (selected) {
      const [ cid, ip ] = selected.split(':');
      setCourtId(cid)
      setInitialPrice(ip)
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      });
  }, [])

  const handleSubmitClick = async (e) => {
    e.preventDefault()
    const data = {
      court_id: values.court,
      start: values.start,
      finish: values.finish,
      day_name: values.day_name.toLowerCase(),
      price_increase: values.price_increase
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      await axios.get('/sanctum/csrf-cookie')
      let response
      if (id > 0) {
        response = await axios.put('/api/peak-time/' + id, data, config)
      } else {
        response = await axios.post('/api/peak-time', data, config);
      }
      setErrors('');
      Swal.fire({ icon: "success", title: "Success!", html: response.data.message, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
      setTimeout(function () {
        window.location.href = "/data-master/peaktime";
      }, 2000);
    } catch (e) {
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors)
      } else if (e?.response?.status === 404 || e?.response?.status === 403) {
        Swal.fire({
          icon: "error", title: "Error!", html: e.response.data, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 1500
        });
        setTimeout(function () { window.location.href = "/" }, 1500);
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  }

  return (
    <>
      <h4>
        <b>
          <Link to="/data-master/peaktime" className="btnBack">
            <ArrowLeft />
          </Link>
          {id ? "Edit" : "Create"} Peak Time
        </b>
      </h4>
      <Row>
        <Col className="col-sm-6 m-auto">
          <Card className="p-4 mt-3">
            <Form>
              <Row>
                <Col className="col-12">
                  <Form.Label>Court</Form.Label>
                  <Form.Select name="court" className="form-select form-select-sm" onChange={onChangeSelectCourt}>
                    <option value="">-- courts --</option>
                    {courts.map((court) => <option key={court.id} value={`${court.id}:${court.initial_price}`}>{court.label}</option>)}
                  </Form.Select>
                  {errors.court_id &&
                    <span className="text-danger">{errors.court_id[ 0 ]}</span>}
                </Col>
                <Col className="col-12">
                  <Form.Label>Select day</Form.Label>
                  <Form.Select name="day_name" className="form-select form-select-sm" onChange={onChange}>
                    <option value="">-- days --</option>
                    {dayNames.map(name => <option key={name} value={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>)}
                  </Form.Select>
                  {errors.day_name &&
                    <span className="text-danger">{errors.day_name[ 0 ]}</span>}
                </Col>
                <Col className="col-12">
                  <FormInput type="text" name="price_increase" label="Peak time price" value={values.price_increase} onChange={onChange} />
                  {initialPrice && <span>Real price {initialPrice}</span>}
                  {errors.price_increase &&
                    <span className="text-danger">{errors.price_increase[ 0 ]}</span>}
                </Col>
                <Col className="col-6 col-md-3">
                  <FormInput type="time" name="start" label="Start" value={values.start} onChange={onChange} />
                  {errors.start &&
                    <span className="text-danger">{errors.start[ 0 ]}</span>}
                </Col>
                <Col className="col-6 col-md-3">
                  <FormInput type="time" name="finish" label="End" value={values.finish} onChange={onChange} />
                  {errors.finish &&
                    <span className="text-danger">{errors.finish[ 0 ]}</span>}
                </Col>
                <Col className="col-12 col-sm-12 col-md-12 m-auto text-right pt-3">
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
