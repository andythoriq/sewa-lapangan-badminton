import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { dirIcon } from "./Services/config";
import { Link } from "react-router-dom";

const NavbarUser = () => {
  const navigate = useNavigate();
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
          <Navbar.Brand href="#">
            <img src="./logo.png" alt="bfb" />
            <b className="text-white" style={{ paddingLeft: 6, fontSize: 25 }}>
              BFB
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbartoggler" type="button" data-bs-toggle="offcanvas" data-bs-target="offcanvasNavbar" ria-controls="offcanvasNavbar" className="navbar-toogler shadow-none border-0 bg-white" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
                Home
              </Nav.Link>
              <Nav.Link href="#schedule" style={{ marginRight: "30px", color: "white" }}>
                Schedule
              </Nav.Link>
              <Nav.Link href="#bookinghistory" style={{ marginRight: "30px", color: "white" }}>
                History Booking
              </Nav.Link>
            </Nav>
            {secureLocalStorage.getItem("name") ? (
              <div className="text-white">
                <Dropdown>
                <Dropdown.Menu>
                  ` <Dropdown.Item eventKey="1" style={{ marginTop: "-20px" }}>
                    <Link to={'/profile-user'} className="">
                          Profile
                    </Link>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                      <span>Logout</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div style={{ marginRight: "30px", color: "black" }}>
                          <div onClick={() => {
                            navigate('/dashboard-user')
                          }}><span>Dashboard User</span></div>
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
              <a className="btn btn-danger ms-2" style={{ borderRadius: 13 }} onClick={() => navigate('/userstep')}>
                Register
              </a>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    // <Navbar expand="lg" className="nav-bg">
    //   <Container>
    //     <Navbar.Brand href="/dashboard-user">
    //       <img src="./logo.png" alt="bfb" />
    //       <b className="text-white" style={{ paddingLeft: 5, fontSize: 22 }}>
    //         BFB
    //       </b>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbartoggler" type="button" data-bs-toggle="offcanvas" data-bs-target="offcanvasNavbar" ria-controls="offcanvasNavbar" className="navbar-toogler bg-white"/>
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
    //         <Nav.Link href="/landing-page" style={{ marginRight: "30px", color: "white" }}>
    //           Home
    //         </Nav.Link>
    //         <Nav.Link href="#schedule" style={{ marginRight: "30px", color: "white" }}>
    //           Schedule
    //         </Nav.Link>
    //         <Nav.Link href="#bookinghistory" style={{ marginRight: "30px", color: "white" }}>
    //           History Booking
    //         </Nav.Link>
    //       </Nav>
    //       {secureLocalStorage.getItem("name") ? (
    //           <div className="text-white">
    //             <Dropdown>
    //             <Dropdown.Menu>
    //               ` <Dropdown.Item eventKey="1" style={{ marginTop: "-20px" }}>
    //                 <Link to={'/profile-user'} className="">
    //                       Profile
    //                 </Link>
    //                 </Dropdown.Item>
    //                 <Dropdown.Item eventKey="2" onClick={handleLogout}>
    //                   <span>Logout</span>
    //                 </Dropdown.Item>
    //                 <Dropdown.Item>
    //                     <div style={{ marginRight: "30px", color: "black" }}>
    //                       <div onClick={() => {
    //                         navigate('/dashboard-user')
    //                       }}><span>Dashboard User</span></div>
    //                     </div>
    //                 </Dropdown.Item>
    //               </Dropdown.Menu>
    //               <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
    //                 <div>
    //                   <img src={`${dirIcon}user-circle.png`} alt="" style={{ width:"35px" }}/>  <span className="localstorge m-auto">{secureLocalStorage.getItem("name")}</span>
    //                 </div>
    //               </Dropdown.Toggle>
    //             </Dropdown>
    //             </div>
    //         ) : (
    //           <a className="btn btn-danger ms-2" style={{ borderRadius: 13 }} onClick={() => navigate('/userstep')}>
    //             Register
    //           </a>
    //         )}
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default NavbarUser;
