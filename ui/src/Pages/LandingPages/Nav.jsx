import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import "./nav.css";

const Landing = () => {
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <>
      {/* navbar */}
      <Navbar expand="lg" className={color ? "nav nav-bg" : "nav"}>
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
            <a className="btn btn-danger ms-2" style={{ borderRadius: 13 }} href="userstep">
              Register
            </a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* akhir navbar */}

      {/* header */}
      <div className="p-5 mb-4 bg-light jumbotron">
        <div className="container py-5">
          <h1 className=" fw-bold" style={{ textAlign: "center", marginTop: "100px", fontWeight: 200, color: "white" }}>
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
                  <button className="btn btn-danger">AboutUs</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about */}

      {/* Card Court */}
      <section id="court">
        <div className="container py-5">
          <div className="row cnt2 text-center">
            <div className="col">
              <h2 className="fw-bold text-white">Our Courts</h2>
              <p className="text-white">BFB is a sports hall that rents out courts specifically for badminton.</p>
            </div>
          </div>

          {/* card */}
          <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
            <div className="col">
              <div className="card card-court">
                <img src="./assets/img/court/1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <div className="rental-prince">
                    <h5 className="card-title fw-bold">Court A</h5>
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
            </div>
          </div>
        </div>
      </section>
      {/* end card court */}

      {/* Servicer */}
      <Container>
        <section className="setup" id="#service" style={{ padding: "30px 0", marginBottom: "10px" }}>
          <div className="container py-5">
            <div className="row cnt2 text-center">
              <div className="col">
                <h2 className="fw-bold">Our Services</h2>
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
                  <h5 style={{ fontWeight: 700, fontSize: "18px", lineHeight: "24px", paddingBottom: "12px" }}>Registrasion Account</h5>
                  <p style={{ fontWeight: 400, fontSize: "13px", lineHeight: "27px", maxWidth: "284px", margin: "0 auto", color: "black" }}>
                    Customer will be asked to register for an account first. then customer will receive an OTP code as verification.
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
                    Customers will receive a QR Code after account registration. and brought to the GOR QR Code is used as proof of booking.
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
                    Payment is made after the customer has finished playing. payments can use deposits, and other systems in payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
      {/* end about work */}
      <div className="footer lpages text-center text-light p-3 mt-5">
        <div className="last-footer">
          <p className="copyright"> &copy; Copyright 2023 PKL Cibione. All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Landing;
