import React, { useState } from 'react'
import FormRegularBooking from './ModalDialog/FormRegularBooking'

function Court({ id, label, image_path, description, initial_price, index }) {
  const [show, setShow] = useState(false)
  return (<>
    <div className="col">
      <div className="card card-court">
        {image_path ? 
        <img src={process.env.REACT_APP_BACKEND_URL + '/storage/' + image_path} className="card-img-top" alt={label} />
          : <img src={`./assets/img/court/${index + 1}.jpg`} className="card-img-top" alt={label} />}
        <div className="card-body">
          <div className="rental-prince">
            <h5 className="card-title fw-bold">{label}</h5>
            <div className="text">
              Rental price
              <h5 className="fw-bold" style={{ color: "#d93221" }}>
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(initial_price)}/hour
              </h5>
            </div>
          </div>
          <div>
            <p>{description.substring(0, 200) + '.....'}</p>
          </div>
        </div>
        <button className="btn btn-booking text-center border border-dark" onClick={() => setShow(true)} style={{ fontSize: "24px", width: "100%", padding: "15px" }}>
          Booking
        </button>
      </div>
    </div>
    <FormRegularBooking handleClose={() => setShow(false)} isShow={show} court_id={id} />
  </>)
}

export default Court
