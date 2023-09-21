import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { logoApp, namaApp } from "./Services/config";

const NavbarUser = () => {
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
    <Navbar expand="lg" className="navbar navbar-expand-lg bg-danger fixed-top">
      <Container>
        <Navbar.Brand href="#home" className="lpages">
          <img src={`/${logoApp}`} alt="bfb" />
          <b className="text-white" style={{ paddingLeft: 5, fontSize: 25 }}>
            {namaApp}
          </b>
        </Navbar.Brand>
        <Navbar.Toggle className="custom-toggler navbar-toggler" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#schedule" className="text-white">
              Schedule
            </Nav.Link>
            <Nav.Link href="#bookinghistory" className="text-white">
              History Booking
            </Nav.Link>
            <div className="h-screen bg-gray-200 flex justify-center">
              <div className="relative">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <img src="./assets/icon/user-circle.png" alt="user" className="object-cover rounded-full cursor-pointer mt-0" style={{ width: 35 }} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item eventKey="1" href="/logout">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarUser;
