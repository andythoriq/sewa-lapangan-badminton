import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import "./landing2.css";
import CreateBookingFormRegular from "../Users/CreateBooking/regular";
import CreateBookingFormMember from "../Users/CreateBooking/member";

const LandingBooking = () => {
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

  const [checkedRegular, setCheckedRegular] = useState(true);
    const [checkedMember, setCheckedMember] = useState(false);

    const handleRadioBtn = (aksi='') => {
        // console.log(aksi);
        if (aksi==='member') {
            setCheckedRegular(false);
            setCheckedMember(true);
        }else{
            setCheckedRegular(true);
            setCheckedMember(false);
        }
    }


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
              <Nav.Link href="schedule" className="text-white">
                Schedule
              </Nav.Link>
              <Nav.Link href="bookinghistory" className="text-white">
                History Booking
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

      <div className="container mt-5">
        <div className="table-responsive" id="schedule">
          <h3 className="text-center mt-5">Schedule</h3>
          <hr style={{ width: 200 }} align="center"></hr>
        </div>
        <div className="d-flex">
          <div className="form-check">
            <input type="radio" className="form-check-input" name="radionExam" value="regular" defaultChecked={checkedRegular} onClick={() => handleRadioBtn("regular")} />
            <label>Regular</label>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div className="form-check form-check-inline">
            <input type="radio" className="form-check-input" name="radionExam" value="member" defaultChecked={checkedMember} onClick={() => handleRadioBtn("member")} />
            <label>Member</label>
          </div>
        </div>
        {
            checkedRegular ? <CreateBookingFormRegular/>:<CreateBookingFormMember/>
        }
      </div>
    </>
  );
};

export default LandingBooking;
