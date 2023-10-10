import React, { useState } from "react";
import ScheduleModal from "../Users/Schedule/modal";
// import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./landing2.css";
import RiwayatBooking from "./RiwayatBooking";
import FooterPublic from "../../Components/FooterPublic";
import NavbarUser from "../../Components/NavbarUser";

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

  return (
    <>
      <NavbarUser/>
      <div className="container mt-5">
        <div className="table-responsive" id="schedule">
          <h3 className="text-left mt-5">Schedule</h3>
          <hr style={{ width: 130, float:'left', marginTop: 0 }} />
        </div>
        <Row>
          <Col className="col-12 col-md-6 d-flex mt-3 mb-2">
            <div>
              <div className="bullet bullet-cyan"></div> <div className="bullet-text">Booked</div>
            </div>
            <div>
              <div className="bullet bullet-green"></div> <div className="bullet-text">Finished</div>
            </div>
            <div>
              <div className="bullet bullet-red"></div> <div className="bullet-text">Avaible</div>
            </div>
            <div>
              <div className="bullet bullet-orange"></div> <div className="bullet-text">On progress</div>
            </div>
          </Col>
          {/* <Col className="col-12 col-md-6 mt-1 mb-1" style={{ textAlign: "right" }}>
            <Link to="/landingbookuser" className="btn btn-danger btn-sm">
              + Add Booking
            </Link>
          </Col> */}
        </Row>
        <div className="table-responsive mt-2">
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

      {/* riwayat booking */}
        <div className="container">
          <div className="table-responsive" id="bookinghistory">
            <h3 className="text-left mt-5">History Booking</h3>
            <hr style={{ width: 220, float: "left", marginTop:-5 }}/>
            <RiwayatBooking/>
          </div>
        </div>
        
        {/* <ModalConfirmDelete show={show} handleClose={handleClose} handleYes={handleYes}/> */}
      <FooterPublic/>
    </>
  );
};

export default Landing2;
