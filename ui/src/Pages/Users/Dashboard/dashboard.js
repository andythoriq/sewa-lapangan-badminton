import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Schedule from "../Schedule/schedule";
import Info from "./info";
import FormatDate from "../../../Components/Services/formatDate";
import "./dashboard.css";
import axios from "../../../api/axios";
import Swal from "sweetalert2";
import Loader from "../../../Components/Loader/Loading";

const Dashboard = () => {
  const date = new Date();
  //   let imgCard = [
  //     { name: "Customer", value: "0", icon: "users" },
  //     { name: "Booking Today", value: "0", icon: "wait" },
  //     { name: "Total income all", value: "0", icon: "audit" },
  //     { name: "Today's income", value: "0", icon: "audit" },
  //   ];

  const [ dashboard, setDashboard ] = useState({})

  useEffect(() => {
    axios.get('/api/dashboard')
    .then(({data}) => {
      setDashboard(data)
    })
    .catch((e) => {
      Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
    })
  }, [])

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
                  <h3> {dashboard.customer_count ?? 0} </h3>
                  <p> Customer </p>
                </div>
                <img src="./assets/icon/customers.png" className="img" alt="..." />
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="card-box bg-green">
                <div className="inner">
                  <h3> {dashboard.booking_today_count ?? 0} </h3>
                  <p> Booking Today </p>
                  <img src="./assets/icon/today2.png" className="img" alt="..." />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="card-box bg-orange">
                <div className="inner">
                  <h3> {dashboard.total_income_all ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(dashboard.total_income_all) : 0} </h3>
                  <p> Total income all </p>
                </div>
                <img src="./assets/icon/income.png" className="img" alt="..." style={{ width: "80px" }}/>
              </div>
            </div>
            <div className="col-lg-3" style={{ marginLeft: "-3px" }}>
              <div className="card-box bg-red">
                <div className="inner">
                  <h3> {dashboard.total_income_today ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(dashboard.total_income_today) : 0 } </h3>
                  <p> Total income today </p>
                </div>
                <img src="./assets/icon/incomeday.png" className="img" alt="..." style={{ width: "80px" }}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6"></div>
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
