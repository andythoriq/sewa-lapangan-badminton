import React from "react";
import { Navbar, Container } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import Dropdown from "react-bootstrap/Dropdown";
import { dirIcon } from "./Services/config";
import { Link } from "react-router-dom";

const NavbarPublic = () => {
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
          {/* <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
              About
            </Nav.Link>
            <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
              Court
            </Nav.Link>
            <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
              Services
            </Nav.Link>
            <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
              Home
            </Nav.Link>
          </Nav> */}
          {secureLocalStorage.getItem("name") ? (
            <div className="text-white ms-auto" style={{ maxHeight: "100px" }} >
                <Dropdown>
                  <Dropdown.Menu>
                    ` <Dropdown.Item eventKey="1" style={{ marginTop: "-20px" }}>
                        <Link to={'/profile-user'}>Profile</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div style={{ marginRight: "30px", color: "black" }}>
                          <Link to={'/landing-page'}>Home</Link>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item>
                          <div style={{ marginRight: "30px", color: "black" }}>
                            <Link to={'/dashboard-user'}>Dashboard User</Link>
                          </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                      <div>
                        <img src={`${dirIcon}user-circle.png`} alt="" style={{ width:"35px" }}/>  <span className="localstorge m-auto">{secureLocalStorage.getItem("name")}</span>
                      </div>
                    </Dropdown.Toggle>
                  </Dropdown>
                </div>
            ) : (
              <Link to={'/userstep'} className="btn btn-danger ms-2" style={{ borderRadius: 13 }}>
                Register
              </Link>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPublic;
