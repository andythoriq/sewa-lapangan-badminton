import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormInput from "../../Components/Form/input";
import Swal from "sweetalert2";
import axios from "../../api/axios";

const Login = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [ errors, setErrors ] = useState([]);

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
    },
  ];

  if (errors.password) {
    inputs[1].errorMessage = errors.password[0]
  }

  if (errors.username) {
    inputs[0].errorMessage = errors.username[0]
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/sanctum/csrf-cookie')
      const { data } = await axios.post('/api/login-admin', {
        username: values.username,
        password: values.password
      });
      setErrors('');
      localStorage.setItem("role", "admin");
      localStorage.setItem("token", data);
      localStorage.setItem("username", values.username);
      Swal.fire({ icon: "success", title: "Success!", html: "Login successfully", showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
      setTimeout(function () {
        window.location.href = "/";
      }, 2000);
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      } else if (e.response.status === 404 || e.response.status === 403) {
        Swal.fire({
          icon: "error", title: "Error!", html: e.response.data, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 1500
        });
        setTimeout(function () { window.location.href = "/" }, 1500);
      } else {
        console.error(`Error : ${e}`) 
      }
    } 
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="wrapper bg-dark  d-flex align-items-center justify-content-center w-100" style={{ height: "100vh" }}>
        <div className="login w-400 bg-white rounded-3" style={{ padding: 50 }}>
          <img src="./assets/icon/Male User.png" alt="login" style={{ marginLeft: "100px", marginBottom: "20px" }} />
          <h3 className="mb-1" style={{ fontSize: 23 }}>
            Login Admin
          </h3>
          <Form onSubmit={handleSubmit} style={{ width: "300px" }} className="mx-auto">
            {inputs.map((input) => (
              <Form.Group key={input.id} className="mb-2 ">
                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} icon={input.icon} />
              </Form.Group>
            ))}
            <Button type="submit" className="btn-danger btn-sm btn-block col-12 mt-2 mb-2 rounded">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
