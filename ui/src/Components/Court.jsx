import React, { useEffect, useState } from "react";
import FormRegularBooking from "./ModalDialog/FormRegularBooking";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import FormMemberBooking from "./ModalDialog/FormMemberBooking";
import axios from "../api/axios";
import Swal from "sweetalert2";

function Court({ id, label, image_path, description, initial_price, index, closeToday }) {
  const [show, setShow] = useState(false);
  const [membershipType, setMembershipType] = useState("R")
  const navigate = useNavigate();
  useEffect(() => {
    if (id == secureLocalStorage.getItem('id_to_open')) {
      if (secureLocalStorage.getItem("customer_code")) {
        try {
          axios.get("/api/get-customer-type").then(({data}) => {
            setMembershipType(data)
            setShow(true);
            secureLocalStorage.removeItem('id_to_open')
          })
        } catch (e) {
          Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        }
      }
    }
  }, [secureLocalStorage.getItem('id_to_open')])
  const handleShowBooking = async () => {
    if (secureLocalStorage.getItem("customer_code")) {
      try {
        const {data} = await axios.get("/api/get-customer-type");
        setMembershipType(data)
        setShow(true);
      } catch (e) {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    } else {
      secureLocalStorage.setItem('id_to_open', id)
      navigate("/userstep");
    }
  };
  return (
    <>
      <div className="col g-4">
        <div className="card card-court" onClick={() => {
          if (!closeToday) {
            handleShowBooking()
          }
        }} style={{ cursor: `${closeToday ? 'default' : 'pointer'}` }}>
          {image_path ? <img src={process.env.REACT_APP_BACKEND_URL + "/public/storage/" + image_path} className="card-img-top" alt={label} /> : <img src={`./assets/img/court/${index + 1}.jpg`} className="card-img-top" alt={label} />}
          <div className="card-body">
            <div className="rental-prince">
              <h5 className="card-title fw-bold">{label}</h5>
              <div className="text">
                Rental price
                <h5 className="fw-bold" style={{ color: "#d93221" }}>
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(initial_price)}/hour
                </h5>
              </div>
            </div>
            <div>
              <p>{description.length > 254 ? description.substring(0, 254) + "...." : description }</p>
            </div>
          </div>
          <hr style={{ color: "black" }} />
          <div className="text-center border-dark" onClick={() => {
              if (!closeToday) {
                handleShowBooking()
              }
            }} style={{ fontSize: "24px", width: "100%", padding: "15px", textDecoration: "none", color: "black", fontWeight: "bold", cursor: `${closeToday ? 'default' : 'pointer'}`, pointerEvents: `${closeToday ? 'none' : 'auto'}`, opacity: `${closeToday ? 0.4 : 1}` }}>
            Booking
          </div>
        </div>
      </div>
      {membershipType === "R" && <FormRegularBooking handleClose={() => setShow(false)} label={label} isShow={show} court_id={id} initialPrice={initial_price} />}
      {membershipType === "M" && <FormMemberBooking handleClose={() => setShow(false)} isShow={show} courtProp={{ value: id, label: label, initial_price: initial_price }} />}
    </>
  );
}

export default Court;
