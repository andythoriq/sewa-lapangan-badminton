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
              <Nav.Link href="#schedule" className="text-white">
                Schedule
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
        <Container>
          <Row className="px-4 my-5">
            <Col sm={6}>
              <img src="./logo.png" alt="" className="fluid rounded" />
            </Col>
            <Col sm={6}>
              <h2 className="font-weigh-light mt-4">What is BFB?</h2>
              <hr style={{ width: 200, marginTop: 2 }}></hr>
              <p className="mt-4">
                bfb is an application that allows you to book a court or facility online or offline. You can choose the date, time, and type of court you want. The application has an availability calendar that allows you to see when the
                court or facility is available for booking. bfb may provide discounts to club members or their regular customers as an incentive to faithfully use the facility or pitch.
              </p>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Card Court */}
      <Container>
        <div className="table-responsive" id="court">
          <h3 className="text-center mt-5">Court</h3>
          <hr style={{ width: 200, margin: "auto" }} className="mb-3"></hr>
        </div>
        <div className="row row-cols-md-4 mt-5">
          <div className="col">
            <div className="card">
              <img src="./assets/img/court/1.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Court A</h5>
                <p className="card-text"> BFB Arena is located in a very strategic place. This court is equipped with supporting facilities, such as prayer rooms, air conditioning, and toilets, canteens. with a carpeted court.</p>
                <span style={{ fontSize: 15, color: "#D93221" }} className="fw-bold">
                  Rp 25,000/hour
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" style={{color: "yellow"}} width="16" height="16" fill="currentColor" className="bi bi-star-fill ms-5 mt-1" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
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
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* end card court */}

      <div className="footer lpages text-center text-light p-3 mt-5">
        <div className="last-footer">
          <img src="./assets/icon/c.png" alt="" style={{ width: 25 }} /> 2023. PKL Cibione.
        </div>
      </div>
    </>
  );
};

export default Landing;
