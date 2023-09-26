import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import FormSelect from "../../../Components/Form/select";
import FormInput from "../../../Components/Form/input";
import { Trash3 } from "react-bootstrap-icons";
import "./form.css";
import axios from "../../../api/axios";
import Swal from "sweetalert2";

const CreateBookingFormMember = () => {

  const [dataCustomer, setDataCustomer] = useState([])
  const [dataCourt, setDataCourt] = useState([])

  const [ errors, setErrors ] = useState([])

  const [ showSendBookingCode, setShowSendBookingCode ] = useState(false)
  const [ transactionResponse, setTransactionResponse ] = useState({})
  const [customerCode, setCustomerCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const onChangeSelectCustomer = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      const [ cc, pn ] = selectedValue.split(':');
      setCustomerCode(cc)
      setPhoneNumber(pn)
    }
  }

  useEffect(() => {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.get('/api/customer/member', config)
      .then(({ data }) => {
        setDataCustomer(data);
      })
      .catch((e) => {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      });
    axios.get('/api/court-select', config)
      .then(({ data }) => {
        setDataCourt(data);
      })
      .catch((e) => {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      })
  }, [])

  const pluginSelect = 'react-select'

  const BoxRow = ({ row, onRemove, onUpdate }) => {
    const { court, start_time, finish_time } = row;

    const handleChange = (event) => {
      const { name, value } = event.target;
      onUpdate(name, value);
    };
    return (
      <div>
        <Row className="m-1 p-2 box-border">
          <Col className="col-12 column">
            <Row>
              <Col className="col-12 col-md-4">
                <FormSelect
                  plugin={pluginSelect}
                  name="court"
                  label="Court"
                  menuPlacement="top"
                  options={dataCourt}
                  selected={court}
                  onChange={(value) => onUpdate("court", value)}
                />
              </Col>
              <Col className="col-12 col-md-4">
                <FormInput
                  type="datetime-local"
                  name="start_time"
                  label="Start"
                  value={start_time}
                  onChange={handleChange}
                />
              </Col>
              <Col className="col-12 col-md-4">
                <FormInput
                  type="datetime-local"
                  name="finish_time"
                  label="Finish"
                  value={finish_time}
                  onChange={handleChange}
                />
              </Col>
              <Col className="col-12 mt-3 text-right">
                <button
                  type="button"
                  className="btn btn-danger btn-sm me-md-2 text-white"
                  onClick={onRemove}
                >
                  <Trash3 className="text-white" style={{ marginTop: -5 }} />
                </button>
                <button type="button" className="btn btn-danger btn-sm me-md-2" onClick={addRowBox}>
                  + Add
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  };

  const dataDefault = { court: "", start_time: "", finish_time: "" };
  const [ rows, setRows ] = useState([ dataDefault ]);

  const addRowBox = () => {
    setRows([ ...rows, dataDefault ]);
  };

  const removeRowBox = (index) => {
    const newRowData = [ ...rows ];
    newRowData.splice(index, 1);
    setRows(newRowData);
  };

  const updateRow = (index, name, value) => {
    const newRowData = [ ...rows ];
    newRowData[ index ][ name ] = value;
    setRows(newRowData);
  };
  // const onValUpdate = (i, event, valueSel = []) => {
  //   if (valueSel.value) {
  //     const name = event.name;
  //     const value = valueSel;
  //     const data = [...rows];
  //     data[i][name] = value;
  //     initRow(data);
  //   } else {
  //     const { name, value } = event.target;
  //     const data = [...rows];
  //     data[i][name] = value;
  //     // initRow(data);
  //   }
  // };

  const BoxRows = ({ rows, onRemove, onUpdate }) => {
    return (
      <>
        {rows.map((row, index) => (
          <BoxRow
            key={index}
            row={row}
            onRemove={() => onRemove(index)}
            onUpdate={(name, value) => onUpdate(index, name, value)}
          />
        ))}
      </>
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/create-multiple-rental', {
        customer_id: customerCode,
        user_id: '',
        rentals: rows.map(item => ({
          start: item.start_time,
          finish: item.finish_time,
          court_id: item.court.value
        }))
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
            setShowSendBookingCode(!showSendBookingCode)
          }
        })
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
  };

  const sendBookingCode = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/send-booking-code', {
        phone_number: phoneNumber,
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
        Swal.fire({ icon: "error", title: "Error!", html: "Booking code failed to send", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/history-booking";
            }
          })
      }
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
        .then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        })
    }
  }

  return (
    <>
      <Form>
        <Col className="m-2 col-12 col-md-4 mb-3">
          <Form.Label>Customer</Form.Label>
          <Form.Select name='customer' className='form-select form-select-sm' onChange={onChangeSelectCustomer}>
            <option value="">-- members --</option>
            {dataCustomer.map((customer, index) => (
              <option key={customer.customer_code} value={`${customer.customer_code}:${customer.phone_number}`}>{customer.name}</option>
            ))}
          </Form.Select>
          {errors.customer_id &&
            <span className="text-danger">{errors.customer_id[ 0 ]}</span>}
        </Col>
        <BoxRows rows={rows} onRemove={removeRowBox} onUpdate={updateRow} />
        <Row>
          <Col className="col-12 col-md-1"></Col>
          <Col className="col-12 col-md-3 mt-3 text-center">
            <b>Totally hour:</b>
            <br />
            <br />
            <br />
            {transactionResponse.total_hour ?
              <span>{transactionResponse.total_hour}</span> :
              <span>...</span>
            }
          </Col>
          <Col className="col-12 col-md-3 mt-3 text-center">
            <b>Totally price:</b>
            <br />
            <br />
            <br />
            {transactionResponse.total_price ?
              <span>{transactionResponse.total_price}</span> :
              <span>...</span>
            }
          </Col>
          <Col className="col-12 text-right mt-4">
            <button type="button" className="btn btn-danger btn-sm me-md-4" onClick={onSubmit}>
              Booking
            </button>
          </Col>
        </Row>
      </Form>
      {showSendBookingCode === true &&
        <div>
          <h1>{transactionResponse.booking_code}</h1>
          <h2>Customer phone number : {phoneNumber}</h2>
          <button onClick={sendBookingCode}>Send Via Whatsapp</button>
        </div>}
    </>
  );
};

export default CreateBookingFormMember;
