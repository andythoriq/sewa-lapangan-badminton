import React, { useEffect, useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import PhoneInput from "react-phone-input-2";
import axios from "../../../../api/axios";
import Swal from "sweetalert2";

const CustomerRegular = (props) => {
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [values, setValues] = useState({ name: "", member_active_period: "" });
  // const [values, setValues] = useState({ name: "", phone_number: "", deposit: "", hutang: "", status: selectedStatus });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState([]);

  const [debt, setDebt] = useState('')
  const [deposit, setDeposit] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      phone_number: (phoneNumber.substring(0, 2) === '62' ? "0" + phoneNumber.slice(2) : phoneNumber),
      deposit: deposit,
      debt: debt,
      status: selectedStatus,
      isChangeToMember: isChange,
      member_active_period: values.member_active_period,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      await axios.get("/sanctum/csrf-cookie");
      let response;
      if (id) {
        response = await axios.put("/api/customer/regular/" + id, data, config);
      } else {
        response = await axios.post("/api/customer/regular", data, config);
      }
      setErrors("");
      Swal.fire({ icon: "success", title: "Success!", html: response.data.message, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
      setTimeout(function () {
        window.location.href = "/data-master/regular";
      }, 2000);
    } catch (e) {
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors);
      } else if (e?.response?.status === 404 || e?.response?.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          html: e.response.data,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: 1500,
        });
        setTimeout(function () {
          window.location.href = "/";
        }, 1500);
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });;
      }
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get("/api/customer/regular/" + id + "/edit", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(({ data }) => {
          setValues({ ...values, name: data.name });
          setPhoneNumber(data.phone_number)
          setDebt(data.debt ?? '')
          setDeposit(data.deposit ?? '')
          setSelectedStatus(data.status)
        })
        .catch((e) => {
          Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });;
        });
    }
  }, []);

  return (
    <>
      <h4>
        <b>
          <Link to="/data-master/regular" className="btnBack">
            <ArrowLeft />
          </Link>
          {id ? "Edit" : "Create"} Customer Regular
        </b>
      </h4>
      <Row>
        <Col>
          <Card className="p-3 mt-4" style={{ marginLeft: "-18px" }}>
            <Form>
              <Row>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <FormInput type="text" name="name" label="Name" value={values.name} onChange={onChange} />
                    {errors.name && <span className="text-danger">{errors.name[0]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <label>Phone Number</label>
                    <PhoneInput specialLabel={""} country={"id"} value={(phoneNumber.substring(0, 1) === '0' ? "62" + phoneNumber.slice(1) : phoneNumber)} onChange={(phone) => setPhoneNumber( phone )} />
                    {errors.phone_number && <span className="text-danger">{errors.phone_number[0]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <label>Deposit</label>
                    <CurrencyInput className="form-control" prefix="Rp" id="deposit" name="deposit" decimalsLimit={2} onValueChange={(value) => setDeposit(value)} />
                    {errors.deposit && <span className="text-danger">{errors.deposit[0]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <label>Debt</label>
                    <CurrencyInput className="form-control" prefix="Rp" id="debt" name="debt" decimalsLimit={2} onValueChange={(value) => setDebt(value)} />
                    {errors.debt && <span className="text-danger">{errors.debt[0]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <label>Status</label>
                  <div className="d-flex">
                    <div className="form-check">
                      <input id="activeId" type="radio" className="form-check-input" name="status" value={selectedStatus} onChange={() => setSelectedStatus('Y')} checked={selectedStatus === 'Y'} />
                      <label htmlFor="activeId">Active</label>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="form-check form-check-inline">
                      <input id="inActiveId" type="radio" className="form-check-input" name="status" value={selectedStatus} onChange={() => setSelectedStatus('N')} checked={selectedStatus === 'N'} />
                      <label htmlFor="inActiveId">In active</label>
                    </div>
                  </div>
                  {errors.status && <span className="text-danger">{errors.status[0]}</span>}
                </Col>
                {id && (
                  <Col className="col-12 col-md-6">
                    <label>change membership status</label>
                    <div className="d-flex">
                      <div className="">
                        <button type="button" className="btn btn-warning btn-sm text-white" onClick={() => setIsChange(!isChange)} label="Change">
                          Change
                        </button>
                      </div>
                    </div>
                  </Col>
                )}
                {isChange === true && (
                  <Col className="col-12 col-md-6">
                    <Form.Group>
                      <FormInput type="date" name="member_active_period" label="Active Period" value={values.member_active_period} onChange={onChange} />
                      {errors.member_active_period && <span className="text-danger">{errors.member_active_period[0]}</span>}
                      <button type="button" className="btn btn-dark btn-sm mt-2" aria-label="Close" onClick={() => setIsChange(!isChange)}>
                        cancel
                      </button>
                    </Form.Group>
                  </Col>
                )}
                <Col className="col-12 text-right pt-3">
                  <button onClick={handleSubmitClick} type="button" className="btn btn-danger me-md-4">
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

export default CustomerRegular;
