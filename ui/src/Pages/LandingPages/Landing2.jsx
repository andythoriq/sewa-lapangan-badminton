import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import ScheduleModal from "../Users/Schedule/modal";
import "./landing2.css";
const Landing2 = () => {
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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  return (
    <>
      <Navbar className="navbar navbar-expand-lg bg-danger fixed-top">
        <Container>
          <Navbar.Brand href="#home">
            <img src="./logo.png" alt="bfb" />
            <b className="text-white" style={{ paddingLeft: 5, fontSize: 25 }}>
              BFB
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#court" className="text-white">
                Court
              </Nav.Link>
              <Nav.Link href="#schedule" className="text-white">
                Schedule
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="h-screen bg-gray-200 flex justify-center">
            <div className="relative">
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  <img src="./assets/icon/user-circle.png" alt="user" className="object-cover rounded-full cursor-pointer" style={{ width: 35 }} />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item eventKey="1" href="/logout">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </Navbar>

      <div className="container-build banner">
        <div className="container text-center">
          <h4 className="display-6">Top Quality Badminton Vanue</h4>
        </div>
      </div>

      <Container>
        <h3 className="text-left mt-4" id="court">
          Court
        </h3>
        <p style={{ color: "#B5B5B5" }}>Booked this court</p>
        <hr style={{ width: 200 }}></hr>
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/6.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court A</h5>
                <p className="card-text">BFB Arena is located in a very strategic place. This field is equipped with facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a carpeted field.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/3.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court B</h5>
                <p className="card-text">BFB Arena is located in a very strategic place. This field is equipped with facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a carpeted field.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/1.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court C</h5>
                <p className="card-text">BFB Arena is located in a very strategic place. This field is equipped with facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a carpeted field.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/4.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court D</h5>
                <p className="card-text">BFB Arena is located in a very strategic place. This field is equipped with facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a floored field.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="container mt-5">
        <div className="table-responsive" id="schedule">
          <h3 className="text-center mt-5">Schedule</h3>
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

      <div className="footer text-center text-light p-3 mt-5">
        <div className="last-footer">
          <img src="./assets/icon/c.png" alt="" style={{ width: 25 }} /> 2023. PKL Cibione.
        </div>
      </div>
    </>
  );
};

export default Landing2;
