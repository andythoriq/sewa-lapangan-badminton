import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import secureLocalStorage from "react-secure-storage";
import { useNavigate, useParams } from "react-router-dom";
import PaymentForm from "../../Components/ModalDialog/showPaymentForm";

const Verification = () => {
  // let listData = [{ start: "10-00", finish: "12-00", status: "on progress", price: "Rp150.000", court: "Court A", customer: "Budi - (0892347826382)" }];

  const [errors, setErrors] = useState([])
  const { bookingCodeParam } = useParams()
  const [bookingCode, setBookingCode] = useState(bookingCodeParam || '')
  const [ rentals, setRentals ] = useState([])
  const [transaction, setTransaction] = useState({})
  const [ showPaymentForm, setShowPaymentForm ] = useState(false)
  const navigate = useNavigate()

  const handleCheck = async (e) => {
    e.preventDefault()
    try {
      await axios.get('/sanctum/csrf-cookie')
      const { data } = await axios.post('/api/booking-verification', {
        booking_code: bookingCode
      },{
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
        }
      })
      setErrors('')
      setTransaction(data.transaction)
      setRentals(data.rentals)
    } catch (e) {
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors)
      } else if (e?.response?.status === 404 || e?.response?.status === 403) {
        Swal.fire({
          icon: "error", title: "Error!", html: e.response.data, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
        });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  }

  const handleStartGame = async (e, id) => {
    e.preventDefault()
    try {
      await axios.get('/sanctum/csrf-cookie')
      const { data } = await axios.post('/api/start-rental', {
        id: id
      },{
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
        }
      })
      Swal.fire({
        icon: "success", title: "Success!", html: data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/schedule')
        }
      });
    } catch (e) {
      if (e?.response?.status === 404 || e?.response?.status === 403) {
        Swal.fire({
          icon: "error", title: "Error!", html: e.response.data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
        });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  }

  const handleFinishGame = async (e, id) => {
    try {
      await axios.get('/sanctum/csrf-cookie')
      const { data } = await axios.post('/api/finish-rental', {
        id: id
      }, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
        }
      })
      Swal.fire({
        icon: "success", title: "Success!", html: data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/schedule')
        }
      });
    } catch (e) {
      if (e?.response?.status === 404 || e?.response?.status === 403) {
        Swal.fire({
          icon: "error", title: "Error!", html: e.response.data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
        });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  }

  const TableRows = ({ rows }) => {
    return rows.map((val, index) => {
      return (
        <tr key={val.id}>
          <td>{index + 1}</td>
          <td>{val.start} s/d {val.finish}</td>
          <td>{(val.status === 'B' ? 'Booked' : (val.status === 'O' ? 'On progress' : 'Finished'))}</td>
          <td>{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}).format(val.price)}</td>
          <td>{val.court.label} ({new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val.court.initial_price)})</td>
          <td className=" d-md-flex justify-content-between">
            <button className="btn btn-sm btn-success" onClick={(e) => handleStartGame(e, val.id)} disabled={val.status === 'O' || val.status === 'F'}>Start Game</button>
            &nbsp;
            <button className="btn btn-sm btn-danger" onClick={(e) => handleFinishGame(e, val.id)} disabled={val.status === 'B' || val.status === 'F' }>End Game</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {/* left */}
      <div className="row mt-3">
        <div className="col-lg-3">
          <div className="accordion" id="accordionPayment">
            <div className="accordion-item mb-3">
              <h2 className="h5 px-3 py-3 accordion-header d-flex">
                <div className="form w-100 collapsed">
                  <label className="fw-bold">Check Order</label>
                </div>
              </h2>
              <div id="collapseCC" className="accordion-collapse collapse show" data-bs-parent="#accordionPayment">
                <div className="accordion-body">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Booking Code</label>
                      <input type="text" className="form-control" placeholder="booking Code" value={bookingCode} onChange={(e) => setBookingCode(e.target.value)} />
                      {errors.booking_code && <span className="text-danger">{errors.booking_code[ 0 ]}</span>}
                    </div>
                  </div>
                  <button className="btn btn-danger btn-sm w-100 mt-2" onClick={handleCheck}>Cek Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="col-lg-9">
          <div className="card position-sticky">
            {(rentals.length > 0) ? 
            <>
                <div className="p-3 bg-light bg-opacity-10 d-md-flex justify-content-between">
                  <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Booking Code</div>
                    <span className="text-xl font-weight-medium">{transaction.booking_code ? transaction.booking_code : '....'}</span>
                  </div>
                  <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Total Hour</div>
                    <span className="text-xl font-weight-medium">{transaction.total_hour ? transaction.total_hour : '....'}</span>
                  </div>
                  <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Total Price</div>
                    <span className="text-xl font-weight-medium">{transaction.total_price ? transaction.total_price : '....'}</span>
                  </div>
                  <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Customer</div>
                    <span className="text-xl font-weight-medium">{transaction.customer ? transaction.customer.name + ` (${transaction.customer.phone_number})` : '....'}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive p-3">
                      <table className="table table-hover mt-2" border={1}>
                        <thead>
                          <tr className="text-center">
                            <th width={"1%"}>Id</th>
                            <th width={"40%"}>Start - Finish</th>
                            <th width={"5%"}>Status</th>
                            <th width={"15%"}>Price</th>
                            <th width={"20%"}>Court</th>
                            <th width={"9%"} className="text-center">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <TableRows rows={rentals} />
                        </tbody>
                      </table>
                      <div>
                        <h4>Show payment form</h4>
                        <button onClick={() => setShowPaymentForm(true)} disabled={transaction.isPaid === 'Y'}>Show</button>
                        <span>{transaction.isPaid === 'Y' ? 'Already paid' : 'not paid yet' }</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
                :  
                <>
                <div>
                  <div className="d-flex justify-content-center p-6">
                    <img src={process.env.REACT_APP_BACKEND_URL + '/storage/images/undraw_empty_re_opql.svg'} alt="not-found" style={{ width: "800px" }} />
                  </div>
                </div>
                </>}
          </div>
        </div>
      </div>
      <PaymentForm handleShow={showPaymentForm} handleClose={() => setShowPaymentForm(false)} transaction={transaction} swal={Swal} />
    </>
  );
};

export default Verification;
