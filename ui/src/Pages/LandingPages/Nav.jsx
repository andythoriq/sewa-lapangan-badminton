import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Row, Col, Button } from "react-bootstrap";
import ScheduleModal from "../Users/Schedule/modal";

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
        { court: "1", color: "orange", name: "B" },
        { court: "1", color: "orange", name: "B" },
      ],
    },
    {
      time: "",
      court1: [
        { court: "", color: "", name: "" },
        { court: "", color: "", name: "" },
      ],
    },
    {
      time: "",
      court1: [
        { court: "", color: "", name: "" },
        { court: "", color: "", name: "" },
      ],
    },
    {
      time: "",
      court1: [
        { court: "", color: "", name: "" },
        { court: "", color: "", name: "" },
      ],
    },
    {
      time: "",
      court1: [
        { court: "", color: "", name: "" },
        { court: "", color: "", name: "" },
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
            {/* <Button type="submit" variant="dark" href="userstep">Login</Button>  */}
            <Button type="submit" variant="dark" href="userstep">Register</Button> 
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
        </div>
        <div className="table-responsive mt-5">
          <table id="schedule" className="table" width={"100%"} border={1}>
            <thead>
              <tr>
                <th className="text-center">Time</th>
                <th className="text-center" colSpan={2}>
                  Court 1
                </th>
                <th></th>
                <th className="text-center" colSpan={2}>
                  Court 2
                </th>
                <th></th>
                <th className="text-center" colSpan={2}>
                  Court 3
                </th>
                <th></th>
                <th className="text-center" colSpan={2}>
                  Court 4
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataCourt.map((val, key) => (
                <tr key={key}>
                  <th width={"10%"} className="text-center" style={{ minWidth: 146 }}>
                    {val.time}
                  </th>
                  <td width={"6%"} className={`bg-col-court bg-col-${val.court1 ? val.court1[0].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 0)}></td>
                  <td width={"6%"} className={`bg-col-court bg-col-${val.court1 ? val.court1[1].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 1)}></td>
                  <td width={"4%"} className="bg-col-batas"></td>
                  <td width={"6%"} className={`bg-col-court bg-col-${val.court2 ? val.court2[0].color : ""}`} onClick={() => handleDetail(val.court2 ? val.court2 : [], 0)}></td>
                  <td width={"6%"} className={`bg-col-court bg-col-${val.court2 ? val.court2[1].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 1)}></td>
                  <td width={"4%"} className="bg-col-batas"></td>
                  <td width={"6%"} className={`bg-col-court bg-col-${val.court3 ? val.court3[0].color : ""}`} onClick={() => handleDetail(val.court3 ? val.court3 : [], 0)}></td>
                  <td width={"6%"} className={`bg-col-court bg-col-${val.court3 ? val.court3[1].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 1)}></td>
                  <td width={"4%"} className="bg-col-batas"></td>
                  <td width={"6%"} className={`bg-col-court bg-col-${val.court4 ? val.court4[0].color : ""}`} onClick={() => handleDetail(val.court3 ? val.court3 : [], 0)}></td>
                  <td width={"6%"} className={`bg-col-court bg-col-${val.court4 ? val.court4[1].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 1)}></td>
                  <td width={"2%"} className="bg-col-batas"></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={13}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <ScheduleModal show={show} handleClose={handleClose} size="xl" data={{ name: name, court: court }} />
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
