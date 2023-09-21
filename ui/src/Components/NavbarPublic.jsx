import React from "react";
import { Navbar, Nav, Container} from "react-bootstrap";


const NavbarPublic = () => {
  return (
    <Navbar expand="lg" className="nav">
        <Container>
          <Navbar.Brand href="#">
            <img src="./logo.png" alt="bfb" />
            <b className="text-white" style={{ paddingLeft: 5, fontSize: 22 }}>
              BFB
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="#about" style={{ marginRight: "30px", color: "white" }}>
                About
              </Nav.Link>
              <Nav.Link href="#court" style={{ marginRight: "30px", color: "white" }}>
                Court
              </Nav.Link>
              <Nav.Link href="#service" style={{ marginRight: "30px", color: "white" }}>
                Services
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <a className="btn btn-danger ms-2" style={{ borderRadius: 13 }} href="userstep">
            Register
          </a>
        </Container>
      </Navbar>
  );
};

export default NavbarPublic;