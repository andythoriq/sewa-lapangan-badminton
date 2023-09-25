import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../Components/Form/input";
import FormTextarea from "../../Components/Form/textarea";
import FormSelect from "../../Components/Form/select";

const Setting = () => {
  const [values, setValues] = useState({ label: "", price: "" });
  const [ menuList ] = useState([])
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
        label: values.rolename,
        menu: [],
        status: values.status,
    };
  }
  const [rows, initRow] = useState([]);
    const addRowTable = () => {
        initRow([...rows, ]);
    };
    const TableRows = ({ rows, onValUpdate, onCheckUpdate }) => {
    <td>
                    <FormSelect
                        name="menu"
                        className="form-select form-select-sm"
                        options={[{value: "", label: " -- select menus --"}, ...menuList]}
                        
                        onChange={(event) => onValUpdate( event)}
                    />
                </td>        
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
                      <label style={{ fontSize: "18px" }}>Number WhatsApp</label>
                      <FormInput type="text" name="number" value={values.name} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-2">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Email</label>
                      <FormInput type="text" name="email" value={values.name} onChange={onChange} />
                    </Form.Group>
                  </Col>
                  <Col className="col-12 col-sm-8 col-md-12 m-auto mt-2">
                    <Form.Group>
                      <label style={{ fontSize: "18px" }}>Address</label>
                      <FormTextarea name="address" value={values.description} onChange={onChange} style={{ height: "65px" }} />
                    </Form.Group>
                  </Col>
                  <div className="table-responsive">
                    <table className="table table-hover mt-3" border={1}>
                        <thead>
                            <tr>
                                <th width={'1%'}></th>
                                <th width={'40%'}>Open Days</th>
                                <th width={'50%'}>Start</th>
                                <th width={'50%'}>Finish</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <center>
                    <button type="button" className="btn btn-danger btn-sm" onClick={addRowTable}>
                        + Add
                    </button>
                </center>
                  <Col className="col-12 text-right mt-4">
                    <button type="button" className="btn btn-danger btn-sm me-md-6">
                      Save Change
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
