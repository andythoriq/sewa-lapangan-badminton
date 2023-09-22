import React from "react";
import { Row } from "react-bootstrap";
// import { dirIcon } from "../../../Components/Services/config";
import Schedule from "../Schedule/schedule";
import Info from "./info";
import FormatDate from "../../../Components/Services/formatDate";
import "./dashboard.css";

const Dashboard = () => {
  const date = new Date();
//   let imgCard = [
//     { name: "Customer", value: "0", icon: "users" },
//     { name: "Booking Today", value: "0", icon: "wait" },
//     { name: "Total income all", value: "0", icon: "audit" },
//     { name: "Today's income", value: "0", icon: "audit" },
//   ];

  return (
    <>
      <h4 className="mb-4">
        <b>Dashboard</b>
      </h4>
      <b>{FormatDate(date)}</b>
      <Row className="mt-4 mb-4">
      <div className="container">
    <div className="row">
        <div className="col-lg-3 col-sm-6">
            <div className="card-box bg-blue">
                <div className="inner">
                    <h3> 13436 </h3>
                    <p> Student Strength </p>
                </div>
              
            </div>
        </div>

        <div className="col-lg-3 col-sm-6">
            <div className="card-box bg-green">
                <div className="inner">
                    <h3> ₹185358 </h3>
                    <p> Today’s Collection </p>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-sm-6">
            <div className="card-box bg-orange">
                <div className="inner">
                    <h3> 5464 </h3>
                    <p> New Admissions </p>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-sm-6">
            <div className="card-box bg-red">
                <div className="inner">
                    <h3> 723 </h3>
                    <p> Faculty Strength </p>
                </div>
                <div className="icon">
                    <i className="fa fa-users"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-lg-3 col-sm-6">
          
        </div>
    </div>
</div>
      </Row>
      <div className="mt-4 mb-4"></div>
      <Schedule aksi="dashboard" />
      <Info />
    </>
  );
};

export default Dashboard;
