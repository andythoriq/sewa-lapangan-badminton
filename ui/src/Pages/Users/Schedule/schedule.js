import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ScheduleModal from "./modal";
import axios from "../../../api/axios"

const Schedule = ({ aksi = "" }) => {
  const [courts, setCourts] = useState([])

  const ifDashboard = aksi === "dashboard" ? true : false;
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
      court3: [
        { court: "3", color: "cyan", name: "test2" },
        { court: "3", color: "orange", name: "test3" },
      ],
    },
  ];

  const [booking, setBooking] = useState()

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

  useEffect(() => {
    axios.get('/api/court-select')
      .then(({data}) => {
        setCourts(data)
      }).catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <>
      {ifDashboard ? (
        ""
      ) : (
        <h4 className="mb-4">
          <b>Schedule</b>
        </h4>
      )}
      <Row>
        <Col className="col-12 col-md-6 d-flex mb-4">
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
          <Col className="col-12 mt-1 mb-2 " style={{ textAlign:"right",marginLeft: "-16px" }}>
            <Link to="/create-booking" className="btn btn-sm" style={{ background: "#B21830", color: "white" }}>
              New Booking
            </Link>
          </Col>
      </Row>
      <div className="table-responsive">
        <table id="schedule" className="table" width={"100%"} border={1} style={{ marginLeft: "-16px" }}>
          <thead>
            <tr>
              <th className="text-center">Time</th>
              {courts.map(court => {
                return <th key={court.value} className="text-center" colSpan={2}>
                      {court.label}
                    </th>
              })}
            </tr>
          </thead>
          <tbody>
            {dataCourt.map((val, key) => (
              <tr key={key} >
                <th width={"10%"} className="text-center" style={{ minWidth: 146 }}>
                  {val.time}
                </th>
                <td width={"6%"} className={`bg-col-court bg-col-${val.court1 ? val.court1[0].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 0)}></td>
                <td width={"6%"} className={`bg-col-court bg-col-${val.court1 ? val.court1[1].color : ""}`} onClick={() => handleDetail(val.court1 ? val.court1 : [], 1)}></td>
                {/* <td width={"4%"} className="bg-col-batas"></td> */}
                <td width={"6%"} className={`bg-col-court bg-col-${val.court2 ? val.court2[0].color : ""}`} onClick={() => handleDetail(val.court2 ? val.court2 : [], 0)}></td>
                <td width={"6%"} className={`bg-col-court bg-col-${val.court2 ? val.court2[1].color : ""}`} onClick={() => handleDetail(val.court2 ? val.court2 : [], 1)}></td>
                {/* <td width={"4%"} className="bg-col-batas"></td> */}
                <td width={"6%"} className={`bg-col-court bg-col-${val.court3 ? val.court3[0].color : ""}`} onClick={() => handleDetail(val.court3 ? val.court3 : [], 0)}></td>
                <td width={"6%"} className={`bg-col-court bg-col-${val.court3 ? val.court3[1].color : ""}`} onClick={() => handleDetail(val.court3 ? val.court3 : [], 1)}></td>
                {/* <td width={"4%"} className="bg-col-batas"></td> */}
                <td width={"6%"} className={`bg-col-court bg-col-${val.court4 ? val.court4[0].color : ""}`} onClick={() => handleDetail(val.court4 ? val.court4 : [], 0)}></td>
                <td width={"6%"} className={`bg-col-court bg-col-${val.court4 ? val.court4[1].color : ""}`} onClick={() => handleDetail(val.court4 ? val.court4 : [], 1)}></td>
                {/* <td width={"2%"} className="bg-col-batas"></td> */}
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
    </>
  );
};

export default Schedule;
