import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import secureLocalStorage from "react-secure-storage";
import PaymentForm from "../../Components/ModalDialog/showPaymentForm";
import Scanner from "../Users/ScannerQr/Scanner";
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Search } from "react-bootstrap-icons";

const Verification = () => {
  // let listData = [{ start: "10-00", finish: "12-00", status: "on progress", price: "Rp150.000", court: "Court A", customer: "Budi - (0892347826382)" }];

  const [errors, setErrors] = useState([]);
  const { bookingCodeParam } = useParams();
  const [bookingCode, setBookingCode] = useState(bookingCodeParam || "");
  const [rentals, setRentals] = useState([]);
  const [rentalsAll, setRentalsAll] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);

  const [showDetail, setShowDetail] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // buat paginasi
  const [pageCount, setPageCount] = useState(0); // buat paginasi
  const [originalRentals, setOriginalRentals] = useState([]); // buat pencarian like query
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios
      .get("/api/rental?page=" + currentPage, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        setRentalsAll(data.data);
        setOriginalRentals(data.data);
        setPageCount(data.meta.last_page);
        setCurrentPage(data.meta.current_page);
      })
      .catch((e) => {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      });
  }, [currentPage, changeStatus]);

  const openModalTrx = (e) => {
    // console.log(e.substring(30));
    const bookingCodeNew = e.substring(35);
    // console.log(bookingCodeNew);

    setBookingCode(bookingCodeNew);
    handleCheckDetail(bookingCodeNew);
  };

  const TableRowsAll = ({ rows }) => {
    return rows.map((val, index) => {
      return (
        <tr key={val.id}>
          <td>{index + 1}</td>
          <td>{val.transaction.booking_code} <span className={val.transaction.isPaid === 'Y' ? "text-success" : "text-danger"}>({val.transaction.isPaid === 'Y' ? 'paid' : 'not paid'})</span></td>
          <td>
            {val.customer.name} ({val.customer.phone_number})
          </td>
          <td>
            {val.court.label} ({new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val.court.initial_price)}){" "}
          </td>
          <td>
            <span>
              <Moment format="dddd, Do MMM YYYY h:mm">{val.start}</Moment>
            </span>{" "}
            -{" "}
            <span>
              <Moment format="dddd, Do MMM YYYY h:mm">{val.finish}</Moment>
            </span>
          </td>
          <td className="text-center">{val.status === "B" ? "Booked" : val.status === "O" ? "On progress" : "Finished"}</td>
          <td className=" d-md-flex justify-content-center align-items-center">
            {val.status === "O" || val.status === "F" ? null : (
              <button className="btn btn-sm btn-success" onClick={() => {
                Swal.fire({ icon: "warning", title: "Are you sure?", html: "Are you sure to start this game?", showConfirmButton: true, showCancelButton:true, allowOutsideClick: false, allowEscapeKey: false })
                .then((result) => {
                  if (result.isConfirmed) {
                    handleStartGame(val.id)
                  }
                })
              }}>
                Start Game
              </button>
            )}
            &nbsp;
            {val.status === "B" || val.status === "F" ? null : (
              <button className="btn btn-sm btn-danger" onClick={() => {
                if (val.transaction.isPaid === 'N') {
                  Swal.fire({ icon: "warning", title: "Warning", html: "You can't finish it before paying", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
                } else {
                  Swal.fire({ icon: "warning", title: "Are you sure?", html: "Are you sure to finish this game?", showConfirmButton: true, showCancelButton: true, allowOutsideClick: false, allowEscapeKey: false })
                    .then((result) => {
                      if (result.isConfirmed) {
                        handleFinishGame(val.id)
                      }
                    })
                }
              }}>
                End Game
              </button>
            )}
          </td>
        </tr>
      );
    });
  };

  const handleCheckDetail = async (booking) => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.post(
        "/api/booking-verification",
        {
          booking_code: booking,
        },
        {
          headers: {
            Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
          },
        }
      );
      setErrors("");
      setTransaction(data.transaction);
      setRentals(data.rentals);
      setShowDetail(true)
    } catch (e) {
      if (e?.response?.status === 422) {
        setErrors(e.response.data.errors);
      } else if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          html: e.response.data.message,
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  };

  const handleStartGame = async (id, isCheckDetail = false) => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.post(
        "/api/start-rental",
        {
          id: id
        },
        {
          headers: {
            Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        html: data.message,
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setChangeStatus(!changeStatus);
          if (isCheckDetail) {
            handleCheckDetail(bookingCode)
          }
        }
      });
    } catch (e) {
      if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          html: e.response.data.message,
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  };

  const handleFinishGame = async (id, isCheckDetail = false) => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.post(
        "/api/finish-rental",
        {
          id: id
        },
        {
          headers: {
            Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        html: data.message,
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setChangeStatus(!changeStatus);
          if (isCheckDetail) {
            handleCheckDetail(bookingCode)
          }
        }
      });
    } catch (e) {
      if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          html: e.response.data.message,
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
    }
  };

  const TableRows = ({ rows, transaction }) => {
    return rows.map((val, index) => {
      return (
        <tr key={val.id}>
          <td>{index + 1}</td>
          {/* <td>
            {val.customer.name} ({val.customer.phone_number})
          </td> */}
          <td>
            {val.start} s/d {val.finish}
          </td>
          <td>{val.status === "B" ? "Booked" : val.status === "O" ? "On progress" : "Finished"}</td>
          <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val.price)}</td>
          <td>
            {val.court.label} ({new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val.court.initial_price)})
          </td>

          <td className=" d-md-flex justify-content-between">
            {val.status === "O" || val.status === "F" ? null : (
              <button className="btn btn-sm btn-success" onClick={() => {
                Swal.fire({ icon: "warning", title: "Are you sure?", html: "Are you sure to start this game?", showConfirmButton: true, showCancelButton: true,  allowOutsideClick: false, allowEscapeKey: false })
                  .then((result) => {
                    if (result.isConfirmed) {
                      handleStartGame(val.id, true)
                    }
                  })
              }}>
                Start Game
              </button>
            )}
            &nbsp;
            {val.status === "B" || val.status === "F" ? null : (
              <button className="btn btn-sm btn-danger" onClick={() => {
                if (transaction.isPaid === 'N') {
                  Swal.fire({ icon: "warning", title: "Warning", html: "You can't finish it before paying", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
                } else {
                  Swal.fire({ icon: "warning", title: "Are you sure?", html: "Are you sure to finish this game?", showConfirmButton: true, showCancelButton: true, allowOutsideClick: false, allowEscapeKey: false })
                    .then((result) => {
                      if (result.isConfirmed) {
                        handleFinishGame(val.id, true)
                      }
                    })
                }
              }}>
                End Game
              </button>
            )}
          </td>
        </tr>
      );
    });
  };

  const updateTransaction = (newTransaction) => {
    if (newTransaction) {
      setTransaction(newTransaction)
    }
  }

  const handlePageClick = (e) => {
    const number = e.selected + 1;
    setCurrentPage(number);
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get('/api/rental?keyword=' + searchValue, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
        }
      });
      setRentalsAll(data.data)
      if (data.data.length < 1) {
        Swal.fire({ icon: "warning", title: "Not found!", html: `'${searchValue}' in booking not found`, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
          .then((result) => {
            if (result.isConfirmed) {
              setRentalsAll(originalRentals)
            }
          })
      }
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
    }
  }

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
                  <p style={{ fontSize: "15px" }} className="mt-2">
                    enter the relevant booking code. to view detailed information. -BFB
                  </p>
                </div>
              </h2>
              <div className=" collapse show">
                <div className="accordion-body">
                  <div className="col">
                    <div className="mb-1">
                      <label className="form-label">Booking Code</label>
                      <input type="text" className="form-control" placeholder="booking Code" value={bookingCode} onChange={(e) => setBookingCode(e.target.value)} />
                      {errors.booking_code && <span className="text-danger">{errors.booking_code[0]}</span>}
                    </div>
                  </div>
                  <button className="btn btn-danger btn-sm w-100 mt-2" onClick={() => handleCheckDetail(bookingCode)}>
                    Check Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="accordion" id="accordionPayment">
            <div className="accordion-item mb-3">
              <div id="collapseCC" className="accordion-collapse collapse show" data-bs-parent="#accordionPayment">
                <div className="accordion-body">
                  <div className="col">
                    <div className="mb-3">
                      <Scanner openModal={openModalTrx} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg" width="90%">
            <Modal.Header closeButton>
              <Modal.Title>Detail Rental</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="p-3 bg-light bg-opacity-10 d-md-flex justify-content-between">
                <div className="px-3 my-3 text-center">
                  <div className="cart-item-label">Booking Code</div>
                  <span className="text-xl fw-bolder">{transaction.booking_code ? transaction.booking_code : "...."}</span>
                </div>
                <div className="px-3 my-3 text-center">
                  <div className="cart-item-label">Total Hour</div>
                  <span className="text-xl fw-bolder">{transaction.total_hour ? transaction.total_hour : "...."}</span>
                </div>
                <div className="px-3 my-3 text-center">
                  <div className="cart-item-label">Total Price</div>
                  <span className="text-xl fw-bolder">{transaction.total_price ? transaction.total_price : "...."}</span>
                </div>
                <div className="px-3 my-3 text-center">
                  <div className="cart-item-label">Customer</div>
                  <span className="text-xl fw-bolder">{transaction.customer ? transaction.customer.name + ` (${transaction.customer.phone_number})` : "...."}</span>
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
                        <TableRows rows={rentals} transaction={transaction} />
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={transaction.isPaid === "Y" ? "text-success" : "text-danger"}>{transaction.isPaid === "Y" ? " Already paid" : " Not paid yet"}</span>
                      <button className="btn btn-primary" onClick={() => {
                        setShowPaymentForm(true)
                        setShowDetail(false)
                      }} disabled={transaction.isPaid === "Y"}>
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        {/* right */}
        <div className="col-lg-12">
          <Card className="p-3 mt-5" style={{ marginLeft: "-18px" }}>
            <div className="row">
              <div className="col-12 col-md-4" style={{ marginTop: -20 }} >
                <div className="inputSearch">
                  <form onSubmit={handleSearch}>
                    <input type="text" name="search" value={searchValue} icon={<Search />} onChange={(e) => setSearchValue(e.target.value)} placeholder="Enter to search" />
                  </form>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mt-3" border={1}>
                <thead>
                  <tr>
                    <th width={"1%"}>No</th>
                    <th width={"20%"}>Booking Code</th>
                    <th width={"20%"}>Name Customer</th>
                    <th width={"15%"}>Court</th>
                    <th width={"24%"}>Start - Finish</th>
                    <th width={"10%"} className="text-center">
                      Status
                    </th>
                    <th width={"10%"} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <TableRowsAll rows={rentalsAll} />
                </tbody>
              </table>
            </div>
            <div className="clearfix">
              <ReactPaginate
                className="pagination"
                pageLinkClassName="page-link"
                breakLabel="..."
                nextLinkClassName="page-link next"
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLinkClassName="page-link prev"
                previousLabel=" <"
                renderOnZeroPageCount={null}
              />
            </div>
          </Card>
        </div>
      </div>
      <PaymentForm 
        isShow={showPaymentForm} 
        handleClose={() => setShowPaymentForm(false)} 
        transaction={transaction} 
        swal={Swal} 
        updateTransaction={updateTransaction} 
        setShowDetail={setShowDetail}
      />
    </>
  );
};

export default Verification;
