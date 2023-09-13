import React, { useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { logoApp, namaApp } from "../../Components/Services/config";
import FormInput from "../../Components/Form/input";
import Swal from "sweetalert2";

const Login = () => {
    const [values, setValues] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});

    const inputs = [
        {
          id: 1,
          label: "Username",
          name: "username",
          type: "text",
          placeholder: "input username",
          errorMessage: errors.username,
        },
        {
          id: 2,
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "input password",
          errorMessage: errors.password,
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {}
        if (!values.username.trim()) validationErrors.username = "Username required";
        if (!values.password.trim()) validationErrors.password = "Password wajib diisi";
  
        // console.log(validationErrors);
        setErrors(validationErrors);
        if(Object.keys(validationErrors).length === 0) {
          localStorage.setItem("role", "admin");
          localStorage.setItem('token', 'abcd12345');
          localStorage.setItem('username', values.username);
          Swal.fire({icon:"success", title:"Success!", html:'Login successfully', 
            showConfirmButton: false, allowOutsideClick: false,
            allowEscapeKey:false, timer: 2000});
          setTimeout(function() { window.location.href="/"; }, 2000);
        }
      };
    
      const onChange = (e) => { 
        setErrors({});
        setValues({ ...values, [e.target.name]: e.target.value });
      }

    return (
    <Container className="login pt-5 pb-5">
        <Card className="bgLogin shadow">
            <Row>
                <Col className="col-sm-6 px-0 d-none d-md-block divLeft position-relative">
                    <div className="position-relative top-50 start-50 translate-middle p-4">
                        <img src={`/${logoApp}`} alt="" width={30} style={{marginTop:-10}}/><b style={{paddingLeft:5, fontSize:20}}>{namaApp}</b>
                        <div className="text-danger mt-4 text-heading">Management Booking</div>
                        <div className="mb-3 text-heading">Field Badminton</div>
                        <div style={{fontSize:12}}>
                            BFB provides various features that support the operational<br/>
                            management of yout Badminton sport facility
                        </div>
                    </div>
                </Col>
                <Col className="col-12 col-md-6 text-white divRight position-relative p-5">
                    <div className="position-relative top-50 start-50 translate-middle p-4">
                        <div className="d-md-none d-md-block text-center mb-2">
                            <img src={`/${logoApp}`} alt="" width={100}/>
                        </div>
                        <b className="text-heading" style={{fontSize:29}}>Let's login to your BFB account first</b>
                        <br/>
                        <Form onSubmit={handleSubmit} style={{width: '100%'}}>
                            {inputs.map((input) => (
                            <Form.Group key={input.id} className="mb-2">
                                <FormInput
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                                icon={input.icon}
                                />
                            </Form.Group>
                            ))}
                            <Button type='submit' className='btn-danger btn-sm btn-block col-12 mt-2 rounded'>Login</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Card>
    </Container>
    );
}

export default Login;