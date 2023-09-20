import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Row, Col, Button } from "react-bootstrap";
import "./nav.css";

const Landing = () => {
  return (
    <>
      <Navbar className="navbar navbar-expand-lg bg-danger fixed-top">
        <Container>
          <Navbar.Brand href="#home" className="lpages">
            <img src="./logo.png" alt="bfb" />
            <b className="text-white" style={{ paddingLeft: 5, fontSize: 25 }}>
              BFB
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about" className="text-white">
                About
              </Nav.Link>
              <Nav.Link href="#court" className="text-white">
                Court
              </Nav.Link>
            </Nav>
            <Button type="submit" variant="dark" href="userstep" className="ms-2">
              Registion
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container-build banner">
        <div className="container text-center">
          <h4 className="display-6">Top Quality Badminton Venue</h4>
        </div>
      </div>

      <main id="about">
        <Container style={{ padding: "150px 0" }}>
          <Row className="px-4 my-5">
            <Col sm={6}>
              <img src="./logo.png" alt="" className="fluid rounded" />
            </Col>
            <Col sm={6}>
              <span className="font-weigh-light mt-4 fw-semibold" style={{ fontSize: 35 }}>
                What is
              </span>{" "}
              <span className="fw-semibold" style={{ color: "#D93221", fontSize: 30 }}>
                BFB
              </span>{" "}
              <span style={{ fontSize: 30 }}>?</span>
              <hr style={{ width: 200, height: 20, marginTop: 2, color: "black" }}></hr>
              <p className="mt-4 mb-5">
                bfb is an application that allows you to book a court or facility online or offline. You can choose the date, time, and type of court you want. The application has an availability calendar that allows you to see when the
                court or facility is available for booking. bfb may provide discounts to club members or their regular customers as an incentive to faithfully use the facility or pitch.
              </p>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Card Court */}
      <Container style={{ padding: "150px 0" }}>
        <div id="court">
          <h3 className="text-center mt-5 fw-semibold">Court</h3>
          <hr style={{ width: 150, margin: "auto" }} className="mb-3"></hr>
        </div>
        <div className="row row-cols-md-4 mt-5">
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/1.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court A</h5>
                <p className="card-text mb-3"> BFB Arena is located in a very strategic place. This court is equipped with supporting facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a carpeted court.</p>
                <span style={{ fontSize: 15, color: "#D93221" }} className="fw-bold">
                  Rp 25,000/hour
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-5" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/3.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court B</h5>
                <p className="card-text"> BFB Arena is located in a very strategic place. This court is equipped with supporting facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a carpeted court.</p>
                <span style={{ fontSize: 15, color: "#D93221" }} className="fw-bold">
                  Rp 25,000/hour
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-5" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/6.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court C</h5>
                <p className="card-text">BFB Arena is located in a very strategic place. This court is equipped with supporting facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a carpeted court.</p>
                <span style={{ fontSize: 15, color: "#D93221" }} className="fw-bold">
                  Rp 25,000/hour
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-5" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/4.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court D</h5>
                <p className="card-text">BFB Arena is located in a very strategic place. This court is equipped with supporting facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a floor court.</p>
                <span style={{ fontSize: 15, color: "#D93221" }} className="fw-bold">
                  Rp 35,000/hour
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-5" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half ms-1" style={{ color: "yellow" }} viewBox="0 0 16 16">
                  <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* end card court */}

      {/* about work */}
      <Container>
        <section className="setup" style={{ padding: "150px 0" }}>
          <div className="text-header text-center">
            <h3 style={{ fontSize:"40px", fontWeight: 700, lineHeight: "48px", padding: "30px 0" }}>How It Work</h3>
          </div>
          <div className="items text-center">
            <div className="row">
              <div className="col-md-4">
                <div className="icons" style={{ padding: "27px 0" }}>
                  <img src="./assets/icon/document.png" alt="..." />
                </div>
                <div className="desc">
                  <h5 style={{ fontWeight: 700, fontSize: "18px", lineHeight: "24px", paddingBottom: "12px" }}>Registrasion Account</h5>
                  <p style={{ fontWeight: 400, fontSize: "13px", lineHeight: "27px", maxWidth: "284px", margin: "0 auto", color: "black"}}>Customer will be asked to register for an account first. then customer will receive an OTP code as verification.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icons" style={{ padding: "27px 0" }}>
                  <img src="./assets/icon/code.png" alt="..." />
                </div>
                <div className="desc">
                  <h5 style={{ fontWeight: 700, fontSize: "18px", lineHeight: "24px", paddingBottom: "12px" }}>QR Code</h5>
                  <p style={{ fontWeight: 400, fontSize: "13px", lineHeight: "27px", maxWidth: "284px", margin: "0 auto", color: "black"}}>Customers will receive a QR Code after account registration. and brought to the GOR The QR Code is used as proof of booking.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icons" style={{ padding: "27px 0" }}>
                  <img src="./assets/icon/pay.png" alt="..." />
                </div>
                <div className="desc">
                  <h5 style={{ fontWeight: 700, fontSize: "18px", lineHeight: "24px", paddingBottom: "12px" }}>Payment</h5>
                  <p style={{ fontWeight: 400, fontSize: "13px", lineHeight: "27px", maxWidth: "284px", margin: "0 auto", color: "black"}}>Payment is made after the customer has finished playing. payments can use deposits, and other systems in payment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
      {/* end about work */}

      <div className="footer lpages text-center text-light p-3 mt-5">
        <div className="last-footer">
          <img src="./assets/icon/c.png" alt="" style={{ width: 25 }} /> 2023. PKL Cibione.
        </div>
      </div>
    </>
  );
};

export default Landing;
