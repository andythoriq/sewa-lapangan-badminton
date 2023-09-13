import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Row, Col, Modal, Button } from "react-bootstrap";

import "./nav.css";

const Landing = () => {
  let dataCourt = [
    // {time:'08.00-09.00', court1_1:'', court1_2:'cyan', court2_1:'', court2_2:'', court3_1:'', court3_2:'', court4_1:'', court4_2:'',
    {
      time: "08.00-09.00",
      court1: [
        { court: "1", color: "", name: "" },
        { court: "1", color: "cyan", name: "A" },
      ],
    },
    {
      time: "09.00-10.00",
      court1: [
        { court: "1", color: "green", name: "B" },
        { court: "1", color: "", name: "" },
      ],
    },
    {
      time: "10.00-11.00",
      court1: [
        { court: "1", color: "", name: "" },
        { court: "1", color: "orange", name: "C" },
      ],
    },
    {
      time: "11.00-12.00",
      court1: [
        { court: "1", color: "cyan", name: "D" },
        { court: "1", color: "", name: "" },
      ],
    },
    {
      time: "12.00-13.00",
      court1: [
        { court: "1", color: "", name: "" },
        { court: "1", color: "green", name: "E" },
      ],
    },
    {
      time: "13.00-14.00",
      court1: [
        { court: "1", color: "red", name: "F" },
        { court: "1", color: "", name: "" },
      ],
    },
  ];

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [court, setCourt] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDetail = (val = [], id = "") => {
    if (!val[id].color) return false;
    // console.log(val[id]);
    let data = val[id];
    setName(data.name);
    setCourt(data.court);
    handleShow();
  };
  return (
    <>
      <Navbar className="navbar navbar-expand-lg bg-danger fixed-top">
        <Container>
          <Navbar.Brand href="#home" className="lpages">
            <img src="./logo.png" alt="bfb" />
            <b className="text-white" style={{ paddingLeft: 5, fontSize: 25 }}>
              BFB
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about" className="text-white">
                About
              </Nav.Link>
              <Nav.Link href="#schedule" className="text-white">
                Schedule
              </Nav.Link>
            </Nav>
            <DropdownButton id="dropdown-button" align="end" variant="dark" title="Login" data-bs-theme="white">
              <Dropdown.Item href="login">As Admin</Dropdown.Item>
              <Dropdown.Item href="userstep">As User</Dropdown.Item>
            </DropdownButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container-build banner">
        <div className="container text-center">
          <h4 className="display-6">Top Quality Badminton Vanue</h4>
        </div>
      </div>

      <main id="about">
        <Container>
          <Row className="px-4 my-5">
            <Col sm={6}>
              <img src="./logo.png" alt="" className="fluid rounded" />
            </Col>
            <Col sm={6}>
              <h2 className="font-weigh-light mt-4">What is BFB?</h2>
              <hr style={{ width: 200, marginTop: 2 }}></hr>
              <p className="mt-4">
                bfb is an application that allows you to book a field or facility online or offline. You can choose the date, time, and type of field you want. The application has an availability calendar that allows you to see when the
                field or facility is available for booking. bfb may provide discounts to club members or their regular customers as an incentive to faithfully use the facility or pitch.
              </p>
            </Col>
          </Row>
        </Container>
      </main>

      <div className="container">
        <div className="table-responsive lpages" id="schedule">
          <h3 className="text-center">Schedule</h3>
          <hr style={{ width: 200 }} align="center"></hr>
          <table className="table mt-5" width={"100%"} border={1}>
            <thead>
              <tr>
                <th>Time</th>
                <th colSpan={3}>Court 1</th>
                <th></th>
                <th colSpan={3}>Court 2</th>
                <th></th>
                <th colSpan={3}>Court 3</th>
                <th></th>
                <th colSpan={3}>Court 4</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataCourt.map((val, key) => (
                <tr key={key}>
                  <th width={"10%"} style={{ minWidth: 146 }}>
                    {val.time}
                  </th>
                  <td width={"5%"} style={{ minWidth: 70 }} className={`bg-col-${val.court1 ? val.court1[0].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 0)}></td>
                  <td width={"1%"}></td>
                  <td width={"5%"} style={{ minWidth: 70 }} className={`bg-col-${val.court1 ? val.court1[1].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 1)}></td>
                  <td width={"5%"} style={{ minWidth: 70 }}></td>
                  <td width={"5%"} style={{ minWidth: 70 }} className={`bg-col-${val.court2 ? val.court2[0].color : ""}`} onClick={() => handleDetail(val.court2 ? val.court2 : [], 0)}></td>
                  <td width={"1%"}></td>
                  <td width={"5%"} style={{ minWidth: 70 }} className={`bg-col-${val.court2 ? val.court2[1].color : ""}`} onClick={() => handleDetail(val.court2 ? val.court2 : [], 1)}></td>
                  <td width={"5%"} style={{ minWidth: 70 }}></td>
                  <td width={"5%"} style={{ minWidth: 70 }} className={`bg-col-${val.court3 ? val.court3[0].color : ""}`} onClick={() => handleDetail(val.court3 ? val.court3 : [], 0)}></td>
                  <td width={"1%"}></td>
                  <td width={"5%"} style={{ minWidth: 70 }} className={`bg-col-${val.court3 ? val.court3[1].color : ""}`} onClick={() => handleDetail(val.court3 ? val.court3 : [], 1)}></td>
                  <td width={"5%"} style={{ minWidth: 70 }}></td>
                  <td width={"5%"} style={{ minWidth: 70 }} className={`bg-col-${val.court4 ? val.court4[0].color : ""}`} onClick={() => handleDetail(val.court4 ? val.court4 : [], 0)}></td>
                  <td width={"1%"}></td>
                  <td width={"5%"} style={{ minWidth: 70 }} className={`bg-col-${val.court4 ? val.court4[1].color : ""}`} onClick={() => handleDetail(val.court4 ? val.court4 : [], 1)}></td>
                  <td width={"1%"}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Court {court}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col className="col-12 col-lg-4">
                <table id="modalTable" width={"100%"}>
                  <tbody>
                    <tr>
                      <td width={"10%"}>Name&nbsp;customer</td>
                      <td width={"1%"}>&nbsp;:&nbsp;</td>
                      <td width={"89%"}>{name}</td>
                    </tr>
                    <tr>
                      <td>Booking&nbsp;date</td>
                      <td>&nbsp;:&nbsp;</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Range&nbsp;date</td>
                      <td>&nbsp;:&nbsp;</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Totally&nbsp;duration</td>
                      <td>&nbsp;:&nbsp;</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col className="col-12 col-lg-4">
                <table id="modalTable" width={"100%"}>
                  <tbody>
                    <tr>
                      <td width={"10%"}>Court</td>
                      <td width={"1%"}>&nbsp;:&nbsp;</td>
                      <td width={"89%"}>{court}</td>
                    </tr>
                    <tr>
                      <td>Input&nbsp;by</td>
                      <td>&nbsp;:&nbsp;</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Condition</td>
                      <td>&nbsp;:&nbsp;</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col className="col-12 col-lg-4">
                <table id="modalTable" width={"100%"}>
                  <tbody>
                    <tr>
                      <td width={"10%"}>Booking&nbsp;Payment</td>
                      <td width={"1%"}>&nbsp;:&nbsp;</td>
                      <td width={"89%"}></td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>&nbsp;:&nbsp;</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Member&nbsp;status</td>
                      <td>&nbsp;:&nbsp;</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Deposit</td>
                      <td>&nbsp;:&nbsp;</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {" "}
              Close{" "}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="footer lpages text-center text-light p-3 mt-5">
        <div className="last-footer">
          <img src="./assets/icon/c.png" alt="" style={{ width: 25 }} /> 2023. PKL Cibione.
        </div>
      </div>
    </>
  );
};

export default Landing;
