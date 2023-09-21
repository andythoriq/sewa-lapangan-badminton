import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../Pages/LandingPages/nav.css";

const NavbarPublic = () => {
  return (
    <Navbar expand="lg" className="nav-bg">
      <Container>
        <Navbar.Brand href="/landing-page">
          <img src="./logo.png" alt="bfb" />
          <b className="text-white" style={{ paddingLeft: 5, fontSize: 22 }}>
            BFB
          </b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbartoggler" type="button" data-bs-toggle="offcanvas" data-bs-target="offcanvasNavbar" ria-controls="offcanvasNavbar" className="navbar-toogler bg-white"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
              About
            </Nav.Link>
            <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
              Court
            </Nav.Link>
            <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
              Services
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPublic;
