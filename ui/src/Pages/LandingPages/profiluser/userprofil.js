import React, { useState } from "react";
// import { Link } from "react-router-dom";
import NavbarPublic from "../../../Components/NavbarPublic";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Row, Col } from "react-bootstrap";
import FormInput from "../../../Components/Form/input";
const ProfilUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <NavbarPublic />
      <div className="container py-5" style={{ marginTop: "50px", marginBottom: "172px" }}>
        <div className="row">
          <div className="col-lg-4">
            <div className="card text-center p-5">
              <div className="card-body">
                <img src="./assets/icon/user-circle.png" alt="user" className="img img-thumbnail rounded-circle w-50" />
                <h2 className="mt-2">nama customer</h2>
                <Button variant="danger" className="btn btn-sm" onClick={handleShow}>
                  Edit
                </Button>
                {/* <Link to={'/formprofil-user/add'} className="btn btn-danger btn-sm add mt-1">
                       Edit
                </Link> */}
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-2">
            <div className="shadow border rounder p-5 mb-5 bg-white">
              <h5>Details</h5>
              <b className="mb-2">Full Name: </b>
              <br />
              <b className="mt-3">Deposit: </b>
              <br />
              <b className="mt-3">Debt: </b>
              <br />
            </div>
          </div>
        </div>
      </div>

      {/* modall */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <FormInput type="number" name="deposit" label="Deposit" />
            </Form.Group>
            <Row>
              <Col className="col-12 col-md-12">
                <Form.Group>
                  <FormInput type="number" name="debt" label="Debt" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" className="btn-sm " onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="footer lpages text-center text-light p-3 mt-5">
        <div className="last-footer">
          <p className="copyright"> &copy; Copyright 2023 PKL Cibione. All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default ProfilUser;
