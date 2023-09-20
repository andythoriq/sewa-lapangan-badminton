import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import FormSelect from "../../../../Components/Form/select";
import { ArrowLeft } from "react-bootstrap-icons";

const UserListForm = () => {
    const {id} = useParams();
    const [values, setValues] = useState({ full_name:"", phone_number:"", email:"", username:"", password:"", user_level:"", status:"" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    let dataUserLevel = [
        {value:"", label:""},
        {value:"1", label:"Admin"},
        {value:"2", label:"Regular user"},
    ];

  return (
    <>
        <h4><b>
            <Link to="/user-management/user-list" className="btnBack"><ArrowLeft/></Link>
            {id? "Edit":"Create"} user list
            </b>
        </h4>
        <Row>
            <Col>
            <Card className="p-3 mt-5">
                <Form>
                <Row>
                    <Col className="col-12 col-md-6">
                        <Form.Group>
                            <FormInput type="text" name="full_name" label="Full name" value={values.full_name} onChange={onChange}/>
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Form.Group>
                            <FormInput type="text" name="phone_number" label="Price" value={values.phone_number} onChange={onChange}/>
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Form.Group>
                            <FormInput type="text" name="username" label="Username" value={values.username} onChange={onChange}/>
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Form.Group>
                            <FormInput type="text" name="password" label="Password" value={values.password} onChange={onChange}/>
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <FormSelect
                            name="user_level"
                            label="User level"
                            className="form-select form-select-sm"
                            options={dataUserLevel}
                        />
                    </Col>
                    <Col className="col-12 col-md-6">
                        <br/>
                        <div className="d-flex mt-2">
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="radionExam" />
                                <label>Active</label>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" name="radionExam" />
                                <label>In active</label>
                            </div>
                        </div>
                    </Col>
                    <Col className="col-12 text-right pt-3">
                        <button type="button" className="btn btn-danger mt-4">
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

export default UserListForm;
