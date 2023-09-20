import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Card, Row, Col, Button } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import { ArrowLeft } from "react-bootstrap-icons";
import axios from "../../../../api/axios";
import Swal from "sweetalert2";

const UserListForm = () => {
    const {id} = useParams();
    const [values, setValues] = useState({ full_name:"", phone_number:"", username:"", password:"", role_id: "", status:"" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
        setSelectedStatus(e.target.value)
    }
    const [errors, setErrors] = useState([])
    const [roles, setRoles] = useState([])
    const [selectedStatus, setSelectedStatus] = useState("")

    useEffect(() => {
        axios.get('/api/role', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(({ data }) => {
            setRoles(data);
        })
        .catch((e) => {
            console.log(e)
        });
        if (id > 0) {
            axios.get('/api/admin-edit/' + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setValues({
                    ...values,
                    full_name: data.name,
                    phone_number: data.phone_number,
                    username: data.username,
                })
            })
            .catch((e) => {
                console.log(e) 
            });
        }
    }, [])

    const handleSubmitClick = async (e) => {
        e.preventDefault()
        const data = {
            name: values.full_name,
            username: values.username,
            phone_number: values.phone_number,
            status: values.status,
            role_id: values.role_id,
            password: values.password,
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
                response = await axios.put('/api/admin/' + id, data, config)
            } else {
                response = await axios.post('/api/admin', data, config);
            }
            setErrors('');
            Swal.fire({ icon: "success", title: "Success!", html: response.data.message, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
            setTimeout(function () {
                window.location.href = "/user-management/user-list";
            }, 2000);
        } catch (e) {
            setErrors(e.response.data.errors)
        }
    };

  return (
    <>
        <h4><b>
            <Link to="/user-management/user-list" className="btnBack"><ArrowLeft/></Link>
            {id? "Edit":"Create"} user list
            </b>
        </h4>
        <Row>
            <Col className="col-12 col-md-6 m-auto">
            <Card className="p-3 mt-5">
                <Form>
                <Row>
                    <Col className="col-12 col-md-6">
                        <Form.Group>
                            <FormInput type="text" name="full_name" label="Full name" value={values.full_name} onChange={onChange}/>
                           {errors.name && 
                            <span className="text-danger">{errors.name[0]}</span>}
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Form.Group>
                            <FormInput type="text" name="phone_number" label="Phone number" value={values.phone_number} onChange={onChange}/>
                            {errors.phone_number &&
                            <span className="text-danger">{errors.phone_number[ 0 ]}</span>}
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Form.Group>
                            <FormInput type="text" name="username" label="Username" value={values.username} onChange={onChange}/>
                            {errors.username &&
                            <span className="text-danger">{errors.username[ 0 ]}</span>}
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Form.Group>
                            <FormInput type="text" name="password" label="Password" value={values.password} onChange={onChange}/>
                            {errors.password &&
                            <span className="text-danger">{errors.password[ 0 ]}</span>}
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-md-6">
                        {/* <FormSelect
                            name="role_id"
                            label="User role"
                            defaultValue={values.role_id}
                            className="form-select form-select-sm"
                            options={roles}
                            onChange={onChange}
                        /> */}
                        <Form.Label>User role</Form.Label>
                        <Form.Select name="role_id" className="form-select form-select-sm" onChange={onChange}>
                            <option value="">-- roles --</option> 
                            {roles.map((role) => <option key={role.id} value={role.id}>{role.label}</option> )}
                        </Form.Select>
                        {errors.role_id &&
                            <span className="text-danger">{errors.role_id[ 0 ]}</span>}
                    </Col>
                    <Col className="col-12 col-md-6">
                        <br/>
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
                    <Col className="col-12 text-right pt-3">
                        <Button type="submit" onClick={handleSubmitClick} className="btn btn-danger">
                            Save
                        </Button>
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
