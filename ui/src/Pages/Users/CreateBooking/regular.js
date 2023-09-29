import React, { useEffect, useState } from 'react'
import { Form, Row, Col } from "react-bootstrap";
import FormInput from '../../../Components/Form/input';
import axios from '../../../api/axios';
import Swal from 'sweetalert2';

const CreateBookingFormRegular = () => {
  const [ dataCustomer, setDataCustomer ] = useState([])
  const [ dataCourt, setDataCourt ] = useState([])
  const [ showSendBookingCode, setShowSendBookingCode ] = useState(false)
  const [ transactionResponse, setTransactionResponse ] = useState({})
  const [ errors, setErrors ] = useState([])

  useEffect(() => {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.get('/api/customer/regular', config)
    .then(({ data }) => {
      setDataCustomer(data);
    })
    .catch((e) => {
      Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
    });
    axios.get('/api/court', config)
    .then(({ data }) => {
      setDataCourt(data);
    })
    .catch((e) => {
      Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
    })
  }, [])

  const [values, setValues] = useState({ court: "", customer_id: "", start_time:"", finish_time:"" });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
   e.preventDefault()
    if (showSendBookingCode) {
      Swal.fire({ icon: "warning", title: "Warning!", html: "you have made a booking!", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
    } else {

      try {
        await axios.get('/sanctum/csrf-cookie')
        const { data } = await axios.post('/api/rental', {
          court_id: values.court,
          customer_id: values.customer_id,
          start: values.start_time,
          finish: values.finish_time,
          user_id: '', // ngambil dari authenticated admin
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        setErrors("");
        Swal.fire({ icon: "success", title: "Success!", html: data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
          .then((result) => {
            if (result.isConfirmed) {
              setTransactionResponse(data.transaction)
              setShowSendBookingCode(true)
            }
          })
      } catch (e) {
        if (e?.response?.status === 422) {
          setErrors(e.response.data.errors)
        } else if (e?.response?.status === 404 || e?.response?.status === 403) {
          Swal.fire({
            icon: "error", title: "Error!", html: e.response.data, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
          });
        } else {
          Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        }
      }

    }
  }

  const sendBookingCode = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/send-booking-code', {
        phone_number: transactionResponse.phone_number,
        booking_code: transactionResponse.booking_code
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      if (data.text === "Success") {
        Swal.fire({ icon: "success", title: "Success!", html: `Booking code has been sent to ${data.to}`, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/history-booking";
            }
          })
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: data.text, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
    }
  }

  return (
    <>
    <Form>
      <Row>
        <Col className="col-12 col-md-6">
            <Form.Label>Customer</Form.Label>
            <Form.Select name='customer_id' className='form-select form-select-sm' onChange={onChange} disabled={showSendBookingCode} >
              <option value="">-- regulars --</option>
              {dataCustomer.map((customer, index) => (
                <option key={customer.customer_code} value={customer.customer_code}>{customer.name}</option>
              ))}
            </Form.Select>
            {errors.customer_id &&
              <span className="text-danger">{errors.customer_id[ 0 ]}</span>}
        </Col>
        <Col className="col-12 col-md-6">
            <Form.Label>Court</Form.Label>
            <Form.Select name='court' className='form-select form-select-sm' onChange={onChange} disabled={showSendBookingCode}>
              <option value="">-- courts --</option>
              {dataCourt.map(court => (
                <option key={court.id} value={court.id}>{court.label}. starting price: {court.initial_price}</option>
              ))}
            </Form.Select>
            {errors.court_id &&
              <span className="text-danger">{errors.court_id[ 0 ]}</span>}
        </Col>
        <Col className="col-6 col-md-3">
          <FormInput type="datetime-local" name="start_time" label="Start" value={values.start_time} onChange={onChange} disabled={showSendBookingCode} />
            {errors.start &&
              <span className="text-danger">{errors.start[ 0 ]}</span>}
        </Col>
        <Col className="col-6 col-md-3">
          <FormInput type="datetime-local" name="finish_time" label="Finish" value={values.finish_time} onChange={onChange} disabled={showSendBookingCode} />
            {errors.finish &&
              <span className="text-danger">{errors.finish[ 0 ]}</span>}
        </Col>
        <Col className="col-12"></Col>
        <Col className="col-12 col-md-6 mt-3 text-center">
            <b>Totally hour:</b>
            <br/>
            <br/>
            <br/>
            {transactionResponse.total_hour ?
              <span>{transactionResponse.total_hour}</span> :
              <span>...</span>
            }
        </Col>
        <Col className="col-12 col-md-6 mt-3 text-center">
            <b>Totally price:</b>
            <br/>
            <br/>
            <br/>
            {transactionResponse.total_price ? 
              <span>{transactionResponse.total_price}</span> :
              <span>...</span>
            }
        </Col>
        <Col className="col-12 text-right mt-4">
            <button type="button" className="btn btn-danger btn-sm me-md-4" onClick={onSubmit} disabled={showSendBookingCode}>
                Booking
            </button>
        </Col>
      </Row>
    </Form>
    {showSendBookingCode === true &&
    <div>
      <h1>{transactionResponse.booking_code}</h1>
      <h2>Customer phone number : {transactionResponse.phone_number}</h2>
      <button onClick={sendBookingCode}>Send Via Whatsapp</button>
      </div>}
    </>
  )
}

export default CreateBookingFormRegular;