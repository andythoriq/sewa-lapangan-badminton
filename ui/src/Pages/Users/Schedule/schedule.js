import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "../../../api/axios"
import { MultiSelect } from "react-multi-select-component";
import Swal from "sweetalert2";
import ScheduleModal from "./modal";
import { Link } from "react-router-dom";

const Schedule = ({ currentPath = "schedule" }) => {
  const [ courts, setCourts ] = useState([])
  const [ hours, setHours ] = useState([])
  const [ isShow, setIsShow ] = useState(false)
  const [ rentalId, setRentalId ] = useState(0)

  const [ selectedCourts, setSelectedCourts ] = useState([]);
  const [ selectedStatus, setSelectedStatus ] = useState([]);

  const [ rentals, setRentals ] = useState([]);

  useEffect(() => {
    axios.get('/api/schedule')
      .then(({ data }) => {
        setHours(data.hours)
        setCourts(data.courts)
        setRentals(data.rentals)
      }).catch((e) => {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      })
  }, [])

  const checkBgColor = (id) => {
    const result = rentals.find(item => item.court_id === id)
    const color = {
      C: "bg-col-red", F: "bg-col-green", B: "bg-col-cyan", O: "bg-col-orange"
    }
    if (result) {
      return color[ result.status ]
    }
  }

  const showDetail = (id) => {
    const rental = rentals.find(item => item.court_id === id)
    if (rental) {
      setRentalId(rental.rental_id)
      setIsShow(true)
    }
  }

  return (
    <>
      {currentPath === 'schedule' && <>
        <h4 className="mb-4 mt-5">
          <b>Schedule</b>
        </h4>
        <Card className="p-3 mt-3 mb-4 " style={{ marginLeft: "-18px" }}>
          <Row className="d-flex justify-content-center">
            <Col className="col-12 col-md-2">
              Date:
              <input className="form-control form-control-sm" type="date" placeholder=".form-control-sm" style={{ width: 159, height: 40 }}></input>
            </Col>
            <Col className="col-12 col-md-2">
              Court:
              <MultiSelect options={courts} value={selectedCourts} onChange={setSelectedCourts} labelledBy="Select" style={{ width: 116 }} />
            </Col>
            <Col className="col-12 col-md-2">
              Condition:
              <MultiSelect options={[{ value: "1", label: "Booked" }, { value: "2", label: "On Progress" }, { value: "3", label: "Finished" }]} value={selectedStatus} onChange={setSelectedStatus} labelledBy="Select" />
            </Col>
            <Col className="col-12 col-md-2 mt-4">
              <Button className="btn" type="submit" style={{ background: "#7F1122 " }}>
                Search
              </Button>
            </Col>
          </Row>
        </Card>
      </>}
      {currentPath === 'dashboard' && <>

      </>}
      <Row>
        <Col className="col-12 col-md-6 d-flex mb-4">
          <div>
            <div className="bullet bullet-cyan"></div> <div className="bullet-text">Up coming</div>
          </div>
          <div>
            <div className="bullet bullet-green"></div> <div className="bullet-text">Finished</div>
          </div>
          <div>
            <div className="bullet bullet-orange"></div> <div className="bullet-text">On progress</div>
          </div>
        </Col>
        <Col className="col-12 mt-1 mb-2 " style={{ textAlign: "right", marginLeft: "-16px" }}>
          <Link to="/create-booking" className="btn btn-sm" style={{ background: "#B21830", color: "white" }}>
            New Booking
          </Link>
        </Col>
      </Row>
      <div className="table-responsive">
        <table id="schedule" className="table" width={"100%"} style={{ marginLeft: "-16px" }}>
          <thead>
            <tr>
              <th className="text-center">Time</th>
              {courts.map(court => {
                return <React.Fragment key={court.value}>
                  <th key={court.value} className="text-center" colSpan={2}>
                    {court.label}
                  </th>
                  <th></th>
                </React.Fragment>
              })}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, key) => (
              <tr key={key}>
                <th width={"10%"} className="text-center" style={{ minWidth: 146 }}>
                  {hour.start} - {hour.finish}
                </th>
                {courts.map((court, index) => {
                  return (<React.Fragment key={court.value}>
                    <td width={"6%"} className={`bg-col-court ${checkBgColor(`${court.value}-${hour.id}:00`)}`} onClick={() => showDetail(`${court.value}-${hour.id}:00`)}></td>
                    <td width={"6%"} className={`bg-col-court ${checkBgColor(`${court.value}-${hour.id}:30`)}`} onClick={() => showDetail(`${court.value}-${hour.id}:00`)}></td>
                    {index === courts.length - 1 ? <td width={"2%"} className="bg-col-batas"></td> : <td width={"4%"} className="bg-col-batas"></td>}
                  </React.Fragment>)
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScheduleModal isShow={isShow} handleClose={() => {
        setIsShow(false)
        setRentalId(0)
      }} rentalId={rentalId} size="xl" swal={Swal} />
    </>
  );
};

export default Schedule;
