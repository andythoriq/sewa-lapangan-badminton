import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col  } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";

const HolidaysModal = ({show="", handleClose, size="md", data=[]}) => {

    const [values, setValues] = useState({ label:"", start:"", end:"" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    useEffect(()=>{
        setValues({ label:data.label?data.label:"", start:data.start?data.start:"", end:data.end?data.end:"" });
    }, [setValues, data]);

    return (
        <>
        <Modal show={show} onHide={handleClose} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{ data.length!==0 ? "Edit":"Create" } Holidays</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <FormInput type="text" name="label" label="Label" value={values.label} onChange={onChange}/>
                    </Form.Group>
                    <Row>
                        <Col className="col-12 col-md-6">
                            <Form.Group>
                            <FormInput type="date" name="start" label="Start" value={values.start} onChange={onChange}/>
                            </Form.Group>
                        </Col>
                        <Col className="col-12 col-md-6">
                            <Form.Group>
                                <FormInput type="date" name="end" label="End" value={values.end} onChange={onChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Close </Button>
                <Button variant="danger"> Save </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default HolidaysModal;