import React, { useEffect, useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import CurrencyInput from "react-currency-input-field";
import PhoneInput from "react-phone-input-2";
import axios from "../../../../api/axios";
import Swal from "sweetalert2";

const defaultMaskOptions = {
  prefix: "Rp",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const currencyMask = createNumberMask({
  ...defaultMaskOptions,
});

const CustomerRegular = (props) => {
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [values, setValues] = useState({ name: "", phone_number: "", deposit: "", hutang: "", status: selectedStatus, member_active_period: "" });
  // const [values, setValues] = useState({ name: "", phone_number: "", deposit: "", hutang: "", status: selectedStatus });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setSelectedStatus(e.target.value);
  };
  const [errors, setErrors] = useState([]);

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      phone_number: values.phone_number,
      deposit: values.deposit,
      debt: values.hutang,
      status: values.status,
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
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      } else if (e.response?.status === 404 || e.response?.status === 403) {
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
        console.error(`Error : ${e}`);
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
          setValues({
            ...values,
            name: data.name,
            phone_number: data.phone_number,
            hutang: data.debt ?? "",
            deposit: data.deposit ?? "",
          });
        })
        .catch((e) => {
          console.error(`Error : ${e}`);
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
                    <PhoneInput specialLabel={""} country={"id"} />
                    {errors.phone_number && <span className="text-danger">{errors.phone_number[0]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <label>Deposit</label>
                    <MaskedInput mask={currencyMask} className="form-control" name="deposit" value={values.deposit} onChange={onChange} />
                    {errors.deposit && <span className="text-danger">{errors.deposit[0]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                  <Form.Group>
                    <label>Debt</label>
                    <CurrencyInput className="form-control" prefix="Rp" id="input-example" name="input-name" decimalsLimit={2} onValueChange={(value, hutang) => console.log(value, hutang)} />
                    {errors.debt && <span className="text-danger">{errors.debt[0]}</span>}
                  </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
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
