import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import FormInput from "../../Components/Form/input";
import FormTextarea from "../../Components/Form/textarea";
import FormSelect from "../../Components/Form/select";
import { dayData } from "../../Components/settingData";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const Setting = () => {
  const [values, setValues] = useState({ name:"", phone_number:"", email:"", address:"", otp_expiration: 0, member_discount: 0 });
  const [rows, initRow] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false)

  const [errors, setErrors] = useState([])

  useEffect(() => {
    axios.get('/api/get-config')
      .then(({data}) => {
        const contactParsed = JSON.parse(data.contact.value)
        setValues({name: data.name.value, 
          phone_number: contactParsed.number, 
          email: contactParsed.email, 
          address: contactParsed.address, 
          otp_expiration: data.expire_duration.value,
          member_discount: data.member_discount.value
        })
        initRow(JSON.parse(data.open_time.value))
      })
      .catch((e) => {
        if (e.response?.status === 404 || e.response?.status === 403 || e?.response?.status === 401) {
          Swal.fire({
            icon: "error", title: "Error!", html: e.response.data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
          });
        } else {
          Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        }
      })
  }, [triggerFetch]);


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function validateSchedule(schedule) {
    const validDays = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ];
    const errors = [];

    schedule.forEach((item) => {
      const { day, hours } = item;

      if (!values.name || !values.phone_number || !values.email || !values.address || !values.otp_expiration || !values.member_discount || schedule.length <= 0) {
        errors.push('38569de2-6078-11ee-8c99-0242ac120002'); // Company data is incomplete.
      }

      if (!day || !validDays.includes(day.toLowerCase())) {
        errors.push('3fc8d328-6079-11ee-8c99-0242ac120002'); // Invalid day
      }

      const { start, finish } = hours;
      if (!start || !finish) {
        errors.push('7a789d1e-6079-11ee-8c99-0242ac120002'); // Start and finish times are required
      } else {
        const startTime = new Date(`2000-01-01T${start}`);
        const finishTime = new Date(`2000-01-01T${finish}`);

        if (startTime >= finishTime) {
          errors.push('93a80a18-6079-11ee-8c99-0242ac120002'); // Finish time must be after start time
        }

        if (start === finish) {
          errors.push('ae004b00-6079-11ee-8c99-0242ac120002'); // Start and finish times cannot be the same
        }
      }
    });

    return errors;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const data = {
      error_message: '',
      configs: [
        {
          slug: 'open-time',
          description: 'Jam buka kami atau operational time adalah waktu kami untuk menerima pesanan booking selain dari waktu ini kami tidak menerima pesanan tersebut.',
          value: JSON.stringify(rows)
        },
        {
          slug: 'name',
          description: 'Nama perusahaan kami akan ditampilkan pada navbar dan tempat informasi yang lainnya.',
          value: values.name
        },
        {
          slug: 'contact',
          description: 'Berisikan nomor Whatsapp, Email, dan Alamat yang sedia untuk dihubungi.',
          value: JSON.stringify({
              number: values.phone_number,
              email: values.email,
              address: values.address
          })
        },
        {
          slug: 'expire-duration',
          description: 'Expire duration OTP code in minutes after request it. (in minutes)',
          value: values.otp_expiration
        },
        {
          slug: 'member-discount',
          description: 'Potongan harga untuk booking member / multiple booking. (in percent)',
          value: values.member_discount
        }
      ]
    }

    const scheduleErrors = validateSchedule(rows);
    if (scheduleErrors.length > 0) {
      data.error_message = scheduleErrors[0]
    }else{
      data.error_message = '';
      setErrors([])
    }
    try {
      await axios.get('/sanctum/csrf-cookie')
      const response = await axios.post('/api/change-config', data)
      Swal.fire({ icon: "success", title: "Success!", html: response.data.message, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
      setTimeout(() => { setTriggerFetch(!triggerFetch) }, 2000);
    } catch (e) {
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors)
      } else if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        Swal.fire({
          icon: "error", title: "Error!", html: e.response.data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
        });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  }

  const TableRows = ({ rows, tableRowRemove, onValUpdate, onValUpdateTime }) => {
    return rows.map((rowsData, index) => {
        const { day, hours } = rowsData;
        // console.log(idnya, isCheck);
        return (
            <tr key={index}>
                <td>
                  <FormSelect
                    name="day"
                    className="form-select form-select-sm"
                    options={dayData}
                    selected={day?day:""}
                    onChange={(event) => onValUpdate(index, event)}
                  />
                </td>
                <td>
                  <FormInput type="time" name="start" value={hours?hours.start:""} onChange={(event) => onValUpdateTime("start",index, event)} />
                </td>
                <td>
                  <FormInput type="time" name="finish" value={hours?hours.finish:""} onChange={(event) => onValUpdateTime("finish",index, event)} />
                </td>
                <td className="text-center">
                    <a href="#delete" onClick={() => tableRowRemove(index)}>
                        <Trash3 className="material-icons" color="dark" title="Delete" />
                    </a>
                </td>
            </tr>
        );
    });
  };
  
  const dataDefault = { day:"", hours:{} };
  const addRowTable = () => {
      initRow([...rows, dataDefault]);
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };
  const onValUpdate = (i, event) => {
    const { name, value } = event.target;
    const data = [...rows];
    data[i][name] = value;
    // console.log(data);
    initRow(data);
  };
  const onValUpdateTime = (name, i, e)  => {
    const value = e.target.value;
    // console.log(value);
    const data = [...rows];
    data[i]["hours"][name] = value;
    // console.log(data);
    // initRow(data);
  }

  return (
    <>
      <h4 className="mb-2">
        <b>Setting</b>
      </h4>
      <Row>
      <Form onSubmit={handleSubmit}>
        <Col className="col-12 col-sm-10 col-md-10 m-auto">
          <Card className="p-3 mt-2">
            <Container>
              <Row className="px-2 my-1">
                <Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Name</label>
                      <FormInput type="text" name="name" value={values.name} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Number WhatsApp</label>
                      <FormInput type="text" name="phone_number" value={values.phone_number} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-2">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Email</label>
                      <FormInput type="text" name="email" value={values.email} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-2">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Address</label>
                      <FormTextarea name="address" value={values.address} onChange={onChange} style={{ height: "65px" }} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>OTP code Expiration (in minutes)</label>
                      <FormInput type="number" name="otp_expiration" value={values.otp_expiration} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Member discount (in percent)</label>
                      <FormInput type="number" name="member_discount" value={values.member_discount} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <div className="table-responsive">
                    <table className="table table-hover mt-3" border={1}>
                        <thead>
                            <tr>
                                <th width={'45%'}>Open Days</th>
                                <th width={'25%'}>Start</th>
                                <th width={'25%'}>Finish</th>
                                <th width={'5%'}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRows
                                rows={rows}
                                tableRowRemove={tableRowRemove}
                                onValUpdate={onValUpdate}
                                onValUpdateTime={onValUpdateTime}
                            />
                        </tbody>
                    </table>
                </div>
                {errors.error_message &&
                    <span className="text-danger">{errors.error_message[ 0 ]}</span>}
                <center>
                    <button type="button" className="btn btn-danger btn-sm" onClick={addRowTable}>
                        + Add
                    </button>
                </center>
                  <Col className="col-12 text-right mt-4">
                    <button type="submit" className="btn btn-danger btn-sm me-md-6">
                      Save
                    </button>
                  </Col>
                </Col>
              </Row>
            </Container>
          </Card>
        </Col>
        </Form>
      </Row>
    </>
  );
};

export default Setting;
