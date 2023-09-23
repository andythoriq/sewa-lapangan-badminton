import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavbarUser = () => {
  return (
    <Navbar expand="lg" className="nav-bg">
      <Container>
        <Navbar.Brand href="/dashboard-user">
          <img src="./logo.png" alt="bfb" />
          <b className="text-white" style={{ paddingLeft: 5, fontSize: 22 }}>
            BFB
          </b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbartoggler" type="button" data-bs-toggle="offcanvas" data-bs-target="offcanvasNavbar" ria-controls="offcanvasNavbar" className="navbar-toogler bg-white"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/landingbookuser" style={{ marginRight: "30px", color: "white" }}>
              Booking
            </Nav.Link>
            <Nav.Link href="#schedule" style={{ marginRight: "30px", color: "white" }}>
              Schedule
            </Nav.Link>
            <Nav.Link href="#bookinghistory" style={{ marginRight: "30px", color: "white" }}>
              History Booking
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarUser;
