import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import "./nav.css";
import Loader from "../../Components/Loader/Loading.js";
import Court from "../../Components/Court";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { dirIcon } from "../../Components/Services/config";

const Landing = () => {
  // loader state
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // create sync method to fetch
  // useEffect(() => {
  //   const DataFetch = () => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 900);
  //   };

  //   DataFetch();
  // }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/api/logout");
      secureLocalStorage.clear();
      setTimeout(function () {
        navigate("/landing-page", { replace: true });
      }, 500);
    } catch (e) {
      if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          html: e.response.data.message,
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            secureLocalStorage.clear();
          }
        });
      } else {
        secureLocalStorage.clear();
      }
    }
  };

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

  // const [color, setColor] = useState(false);
  // const changeColor = () => {
  //   if (window.scrollY >= 90) {
  //     setColor(true);
  //   } else {
  //     setColor(false);
  //   }
  // };

  const [courts, setCourts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/court")
      .then(({ data }) => {
        setCourts(data);
      })
      .catch((e) => {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      });
  }, []);

  // window.addEventListener("scroll", changeColor);

  return courts.length < 0 ? (
    <Loader />
  ) : (
    <>
      {/* navbar */}
      <Navbar expand="lg" className="nav nav-bg ">
        <Container>
          <Navbar.Brand href="#">
            <img src="./logo.png" alt="bfb" />
            <b className="text-white" style={{ paddingLeft: 7, fontSize: 25 }}>
              BFB
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbartoggler" type="button" data-bs-toggle="offcanvas" data-bs-target="offcanvasNavbar" ria-controls="offcanvasNavbar" className="navbar-toogler shadow-none border-0 bg-white" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="#about" style={{ marginRight: "30px", color: "white" }}>
                About
              </Nav.Link>
              <Nav.Link href="#court" style={{ marginRight: "30px", color: "white" }}>
                Court
              </Nav.Link>
              <Nav.Link href="#servis" style={{ marginRight: "30px", color: "white" }}>
                Services
              </Nav.Link>
            </Nav>
            {secureLocalStorage.getItem("name") ? (
              <div className="text-white">
                <Dropdown>
                  <Dropdown.Menu>
                    `{" "}
                    <Dropdown.Item eventKey="1" style={{ marginTop: "-20px" }} onClick={() => navigate("/profile-user")}>
                      <span>Profile</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ marginRight: "30px", color: "black" }}
                      onClick={() => {
                        navigate("/dashboard-user");
                      }}
                    >
                      <span>Dashboard</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => {
                        Swal.fire({
                          icon: "warning",
                          title: "Are you sure?",
                          html: "Are you sure to logout from this web? <br /> you cannot login more than once in a few minutes",
                          showConfirmButton: true,
                          showCancelButton: true,
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleLogout();
                          }
                        });
                      }}
                    >
                      <span>Logout</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <div>
                      <img src={`${dirIcon}user-circle.png`} alt="" style={{ width: "35px" }} /> <span className="localstorge m-auto">{secureLocalStorage.getItem("name")}</span>
                    </div>
                  </Dropdown.Toggle>
                </Dropdown>
              </div>
            ) : (
              <button onClick={() => navigate("/userstep")} className="btn ms-2" style={{ borderRadius: 13, background: "#B21830", color: "white" }}>
                Register
              </button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* akhir navbar */}
      {/* header */}
      <div className="p-5 mb-4 bg-light jumbotron">
        <div className="container py-5">
          <h1 className=" fw-bold" style={{ textAlign: "center", marginTop: "65px", fontWeight: 200, color: "white" }}>
            Top Quality Badminton Sports Venue.
          </h1>
          <p style={{ textAlign: "center", color: "white" }}>bfb is an application that allows you to book a court or facility online or offline. </p>
          <a href="#about">
            <div className="scroll-down"></div>
          </a>
        </div>
      </div>
      {/* end header */}
      {/* about */}
      <section id="about" style={{ padding: "60px 0", marginBottom: "70px" }}>
        <div className="about-area section-padding" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-mb-12">
                <div className="img-area ">
                  <img src="./assets/img/bg-lan.jpg" alt="..." />
                </div>
              </div>
              <div className="col-12 col-lg-6  text-container">
                <div className="about-text">
                  <h2>
                    Know About <span style={{ color: "#D93221" }}>BFB</span>
                  </h2>
                  <p>
                    bfb is an application that allows you to book a court or facility online or offline. You can choose the date, time, and type of court you want. The application has an availability calendar that allows you to see when the
                    court or facility is available for booking. bfb may provide discounts to club members or their regular customers as an incentive to faithfully use the facility or pitch.
                  </p>
                  <button className="btn" style={{ background: "#B21830", color: "white" }}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about */}

      {/* diskon */}
      <section id="diskon" style={{ marginBottom: "70px" }}>
        <div className="container">
          <div className="card-diskon rounded" style={{ backgroundColor: "#201E37" }}>
            <div className="row">
              <div className="col-md-4">
                <img src="../assets/img/people2.jpg" alt="..." className="img-fluid rounded" />
              </div>
              <div className="col-md-8 text-white p-5">
                <p className="card-title mt-2" style={{ color: "#DADADA" }}>
                  Booking
                </p>
                <h1 className="mt-2" style={{ fontWeight: "bold" }}>
                  Easy field booking? <br /> Register now!
                </h1>
                <button className="btn btn-lg btn-light mt-3" href="userstep">
                  Register now{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Court */}
      <section id="court">
        <div className="container py-5">
          <div className="row cnt2 text-center">
            <div className="col">
              <h2 className="fw-bold" style={{ color: "#201E37" }}>
                Our Courts
              </h2>
              <p className="text-dark">BFB is a sports hall that rents out courts specifically for badminton.</p>
            </div>
          </div>

          {/* card */}
          <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
            {courts.map((court, index) => {
              return <Court key={court.id} id={court.id} label={court.label} image_path={court.image_path} description={court.description} initial_price={court.initial_price} index={index} />;
            })}
            {/* <div className="col">
              <div className="card card-court">
                <img src="./assets/img/court/6.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <div className="rental-prince">
                    <h5 className="card-title fw-bold">Court B</h5>
                    <div className="text">
                      Rental price
                      <h5 className="fw-bold" style={{ color: "#d93221" }}>
                        Rp 25,000/hour
                      </h5>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ color: "red" }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>{" "}
                  <span> Prayer rooms</span>
                  <br />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ color: "red" }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>{" "}
                  <span> Toilets</span>
                  <br />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ color: "red" }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>{" "}
                  <span> Canteens</span>
                  <br />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ color: "red" }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>{" "}
                  <span className="mb-3"> Carpeted court</span>
                  <br />
                </div>
                <a className="btn btn-booking text-center border border-dark" type="button" href="userstep" style={{ fontSize: "24px", width: "100%", padding: "15px" }}>
                  Booking
                </a>
              </div>
            </div>

            <div className="col">
              <div className="card card-court">
                <img src="./assets/img/court/4.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <div className="rental-prince">
                    <h5 className="card-title fw-bold">Court C</h5>
                    <div className="text">
                      Rental price
                      <h5 className="fw-bold" style={{ color: "#d93221" }}>
                        Rp 35,000/hour
                      </h5>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ color: "red" }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>{" "}
                  <span> Prayer rooms</span>
                  <br />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ color: "red" }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>{" "}
                  <span> Toilets</span>
                  <br />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ color: "red" }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>{" "}
                  <span> Canteens</span>
                  <br />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ color: "red" }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>{" "}
                  <span className="mb-3"> Floor court</span>
                  <br />
                </div>
                <a className=" btn btn-booking text-center border border-dark" type="button" href="userstep" style={{ fontSize: "24px", width: "100%", padding: "15px" }}>
                  Booking
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* end card court */}
      {/* Servicer */}
      <Container id="servis">
        <section className="setup" style={{ padding: "30px 0", marginBottom: "70px" }}>
          <div className="container py-5">
            <div className="row cnt2 text-center">
              <div className="col">
                <h2 className="fw-bold" style={{ color: "#201E37" }}>
                  Our Services
                </h2>
                <p>Services we provide at bfb that can make it easier for you to book the court</p>
              </div>
            </div>
          </div>
          <div className="items text-center">
            <div className="row">
              <div className="col-md-4">
                <div className="icons" style={{ padding: "27px 0" }}>
                  <img src="./assets/icon/document.png" alt="..." />
                </div>
                <div className="desc">
                  <h5 style={{ fontWeight: 700, fontSize: "18px", lineHeight: "24px", paddingBottom: "12px" }}>Registrasion</h5>
                  <p style={{ fontWeight: 400, fontSize: "13px", lineHeight: "27px", maxWidth: "284px", margin: "0 auto", color: "black" }}>
                  The customer registers, then the customer will receive an OTP code as verification.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icons" style={{ padding: "27px 0" }}>
                  <img src="./assets/icon/code.png" alt="..." />
                </div>
                <div className="desc">
                  <h5 style={{ fontWeight: 700, fontSize: "18px", lineHeight: "24px", paddingBottom: "12px" }}>QR Code</h5>
                  <p style={{ fontWeight: 400, fontSize: "13px", lineHeight: "27px", maxWidth: "284px", margin: "0 auto", color: "black" }}>
                  Customers will receive a QR Code after placing an order. The QR code is used as proof of order.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icons" style={{ padding: "27px 0" }}>
                  <img src="./assets/icon/pay.png" alt="..." />
                </div>
                <div className="desc">
                  <h5 style={{ fontWeight: 700, fontSize: "18px", lineHeight: "24px", paddingBottom: "12px" }}>Payment</h5>
                  <p style={{ fontWeight: 400, fontSize: "13px", lineHeight: "27px", maxWidth: "284px", margin: "0 auto", color: "black" }}>
                  Payment is made after the customer has finished playing. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
      {/* end about work */}
      {/* footer */}
      <div className="footer lpages text-center text-light p-3 mt-5">
        <div className="last-footer">
          <p className="copyright"> &copy; Copyright 2023 PKL Cibione. All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Landing;
