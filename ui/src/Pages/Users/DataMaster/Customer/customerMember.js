import React, { useEffect, useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import axios from "../../../../api/axios";
import Swal from "sweetalert2";


const CustomerMember = () => {
  const { id } = useParams();
  const [ selectedStatus, setSelectedStatus ] = useState("")
  const [values, setValues] = useState({ name: "", phone_number: "", deposit: "", hutang: "", status: selectedStatus, member_active_period: "" });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setSelectedStatus(e.target.value)
  };

  const [ errors, setErrors ] = useState([])

  const handleSubmitClick = async (e) => {
    e.preventDefault()
    const data = {
      name: values.name,
      phone_number: values.phone_number,
      deposit: values.deposit,
      debt: values.hutang,
      status: values.status,
      member_active_period: values.member_active_period
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      await axios.get('/sanctum/csrf-cookie')
      let response
      if (id) {
        response = await axios.put('/api/customer/member/' + id, data, config)
      } else {
        response = await axios.post('/api/customer/member', data, config);
      }
      setErrors('');
      Swal.fire({ icon: "success", title: "Success!", html: response.data.message, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
      setTimeout(function () {
        window.location.href = "/data-master/member";
      }, 2000);
    } catch (e) {
      setErrors(e.response.data.errors)
    }
  }

  useEffect(() => {
    if (id) {
      axios.get('/api/customer/member/' + id + '/edit', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(({ data }) => {
          setValues({
            ...values,
            name: data.name,
            phone_number: data.phone_number,
            hutang: data.debt ?? '',
            deposit: data.deposit ?? '',
            member_active_period: data.member_active_period.substring(0, 10)
          })
        })
        .catch((e) => {
          console.log(e)
        });
    }
  }, [])

  return (
    <>
      <h4>
        <b>
          <Link to="/data-master/member" className="btnBack">
            <ArrowLeft />
          </Link>
          {id ? "Edit" : "Create"} Customer Member
        </b>
      </h4>
      <Row>
        <Col className="col-12 col-md-12 m-auto">
          <Card className="p-3 mt-5 mb-2">
            <Form>
              <Row>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="text" name="name" label="Name" value={values.name} onChange={onChange} />
                    {errors.name &&
                      <span className="text-danger">{errors.name[ 0 ]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="text" name="phone_number" label="Phone number" value={values.phone_number} onChange={onChange} />
                    {errors.phone_number &&
                      <span className="text-danger">{errors.phone_number[ 0 ]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="text" name="deposit" label="Deposit" value={values.deposit} onChange={onChange} />
                    {errors.deposit &&
                      <span className="text-danger">{errors.deposit[ 0 ]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto">
                  <Form.Group>
                    <FormInput type="text" name="hutang" label="Hutang" value={values.hutang} onChange={onChange} />
                    {errors.dept &&
                      <span className="text-danger">{errors.dept[ 0 ]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6 col-sm-8 m-auto">
                  <Form.Group>
                    <FormInput type="date" name="member_active_period" label="Active Period" value={values.member_active_period} onChange={onChange} />
                    {errors.member_active_period &&
                      <span className="text-danger">{errors.member_active_period[ 0 ]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6 col-sm-8 m-auto">
                  <label>Status</label>
                  <div className="d-flex">
                    <div className="form-check">
                      <input type="radio" className="form-check-input" name="status" value="Y" onChange={onChange} />
                      <label>Active</label>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="form-check form-check-inline">
                      <input type="radio" className="form-check-input" name="status" value="N" onChange={onChange} />
                      <label>In active</label>
                    </div>
                  </div>
                  {errors.status &&
                    <span className="text-danger">{errors.status[ 0 ]}</span>}
                </Col>
                <Col className="col-12 col-sm-8 col-md-8 m-auto text-right pt-3">
                  <button onClick={handleSubmitClick} type="button" className="btn btn-danger mt-5">
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

export default CustomerMember;
