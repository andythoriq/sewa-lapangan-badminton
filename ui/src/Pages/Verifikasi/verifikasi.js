import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import PaymentForm from "../../Components/ModalDialog/showPaymentForm";
import Scanner from "../Users/ScannerQr/Scanner";
import Modal from "react-bootstrap/Modal";
import { Card, Form, Col, Row } from "react-bootstrap";
import FormInput from "../../Components/Form/input";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Search } from "react-bootstrap-icons";
import { useGeneralContext } from "../../context/generalContext";
import FormUpdateStartFinish from "../../Components/ModalDialog/FormUpdateStartFinish";

const Verification = () => {
  // let listData = [{ start: "10-00", finish: "12-00", status: "on progress", price: "Rp150.000", court: "Court A", customer: "Budi - (0892347826382)" }];
  const { setTriggerNotif, triggerNotif } = useGeneralContext();
  const [errors, setErrors] = useState([]);
  const { bookingCodeParam } = useParams();
  const [bookingCode, setBookingCode] = useState(bookingCodeParam || "");
  const [rentals, setRentals] = useState([]);
  const [rentalsAll, setRentalsAll] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);

  const [showUpdateRental, setShowUpdateRental] = useState(false)
  const [rentalWillUpdated, setRentalWillUpdated] = useState({start: '', finish: ''})
  const [bookingData, setBookingData] = useState({rentalId: '', bookingCode: '', isCheckDetail: false})

  const [showDetail, setShowDetail] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // buat paginasi
  const [pageCount, setPageCount] = useState(0); // buat paginasi
  const [originalRentals, setOriginalRentals] = useState([]); // buat pencarian like query
  const [searchValue, setSearchValue] = useState("");
  const [originalCount, setOriginalCount] = useState(0);
  const [originalCurrent, setOriginalCurrent] = useState(0);

  useEffect(() => {
    axios
      .get("/api/rental?page=" + currentPage)
      .then(({ data }) => {
        setRentalsAll(data.data);
        setOriginalRentals(data.data);
        setPageCount(data.meta.last_page);
        setOriginalCount(data.meta.last_page);
        setCurrentPage(data.meta.current_page);
        setOriginalCurrent(data.meta.current_page);
        setTriggerNotif(!triggerNotif);
      })
      .catch((e) => {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      });
  }, [currentPage, changeStatus]);

  const openModalTrx = (e) => {

    setBookingCode(e);
    handleCheckDetail(e);
  };

  const TableRowsAll = ({ rows }) => {
    return rows.map((val, index) => {
      return (
        <tr key={val.id}>
          <td>{index + 1}</td>
          <td>
            {val.transaction.booking_code} 
          </td>
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
          <td className="text-center">{val.status === "B" ? "Booked" : val.status === "O" ? "On progress" : val.status === "F" ? "Finished" : "Canceled"}</td>
          <td>
            <div className="d-flex justify-content-evenly">
            {val.status === "O" || val.status === "F" || val.status === "C" ? null : (
              <>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    Swal.fire({ icon: "warning", title: "Start Game", html: "start/finish times will adjust to the current time <br/> or <br/> changing the start/finish times before starting", showConfirmButton: true, confirmButtonText: "Just start the booking", showDenyButton: true, denyButtonColor: "indigo", denyButtonText: "change start/finish", showCancelButton: true, allowOutsideClick: false, allowEscapeKey: false }).then((result) => {
                      if (result.isConfirmed) {
                        handleActionGame(val.id, "start-rental");
                      } else if (result.isDenied) {
                        if (showDetail === true) {
                          document.getElementById("modal-show-detail").classList.toggle('invisible')
                        }
                        setShowUpdateRental(true)
                        setRentalWillUpdated({start: val.start, finish: val.finish})
                        setBookingData({ rentalId: val.id, bookingCode: val.transaction.booking_code, isCheckDetail: false })
                      }
                    });
                  }}
                >
                  start
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => {
                    Swal.fire({ icon: "warning", title: "Are you sure?", html: "Are you sure to cancel this game?", showConfirmButton: true, showCancelButton: true, cancelButtonText: 'No', allowOutsideClick: false, allowEscapeKey: false }).then((result) => {
                      if (result.isConfirmed) {
                        handleActionGame(val.id, "cancel-rental");
                      }
                    });
                  }}
                >
                  cancel
                </button>
              </>
            )}
            {val.status === "B" || val.status === "F" || val.status === "C" ? null : (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  Swal.fire({ icon: "warning", title: "Finish game?", html: "finish adjusts to the current time <br/> or <br/> finish based on the original time", showConfirmButton: true, confirmButtonText: "Just finish", showDenyButton: true, denyButtonColor: "indigo", denyButtonText: "finish proportionally", showCancelButton: true, allowOutsideClick: false, allowEscapeKey: false }).then((result) => {
                    if (result.isConfirmed) {
                      handleActionGame(val.id, "force-finish-rental");
                    } else if (result.isDenied) {
                      handleActionGame(val.id, "finish-rental");
                    }
                  });
                }}
              >
                finish
              </button>
            )}
            </div>
          </td>
          <td>
            <div className="d-flex justify-content-evenly">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                setBookingCode(val.transaction.booking_code)
                handleCheckDetail(val.transaction.booking_code)
              }} >
              Detail
            </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  const handleCheckDetail = async (booking) => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.post("/api/booking-verification", {
        booking_code: booking,
      });
      setErrors("");
      setTransaction(data.transaction);
      setRentals(data.rentals);
      setShowDetail(true);
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

  const handleActionGame = async (id, action, isCheckDetail = false) => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const { data } = await axios.post(
        "/api/" + action, // cancel-rental, start-rental, finish-rental
        {id}
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
          if (isCheckDetail) {
            handleCheckDetail(bookingCode);
          }
          setChangeStatus(!changeStatus);
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

  const sendReceipt = async (booking_code) => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const {data} = await axios.post("/api/send-receipt", {booking_code});
      if (data.text === "Success") {
        Swal.fire({ icon: "success", title: "Success!", html: `Receipt been sent to ${data.to}`, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      } else {
        Swal.fire({ icon: "error", title: "Error!", html: data.text, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      }
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
  }

  const TableRows = ({ rows }) => {
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
          <td>{val.status === "B" ? "Booked" : val.status === "O" ? "On progress" : val.status === "F" ? "Finished" : "Canceled"}</td>
          <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val.price)}</td>
          <td>
            {val.court.label} ({new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val.court.initial_price)})
          </td>

          <td>
            <div className="d-flex justify-content-evenly">
            {val.status === "O" || val.status === "F" || val.status === "C" ? null : (
              <>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    Swal.fire({ icon: "warning", title: "Start Game", html: "start/finish times will adjust to the current time <br/> or </br/> changing the start/finish times before starting", showConfirmButton: true, confirmButtonText: "Just start the booking", showDenyButton: true, denyButtonColor: "indigo", denyButtonText: "change start/finish", showCancelButton: true, allowOutsideClick: false, allowEscapeKey: false }).then((result) => {
                      if (result.isConfirmed) {
                        handleActionGame(val.id, "start-rental", true);
                      } else if (result.isDenied) {
                        if (showDetail === true) {
                          document.getElementById("modal-show-detail").classList.toggle('invisible')
                        }
                        setShowUpdateRental(true)
                        setRentalWillUpdated({start: val.start, finish: val.finish})
                        setBookingData({rentalId: val.id, bookingCode: transaction.booking_code, isCheckDetail: true})
                      }
                    });
                  }}
                >
                  start
                </button>
                <button
                  className="btn btn-sm btn-warning text-white"
                  onClick={() => {
                    Swal.fire({ icon: "warning", title: "Are you sure?", html: "Are you sure to cancel this game?", showConfirmButton: true, showCancelButton: true, cancelButtonText: 'No', allowOutsideClick: false, allowEscapeKey: false }).then((result) => {
                      if (result.isConfirmed) {
                        handleActionGame(val.id, "cancel-rental", true);
                      }
                    });
                  }}
                >
                  cancel
                </button>
              </>
            )}
            {val.status === "B" || val.status === "F" || val.status === "C" ? null : (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  Swal.fire({ icon: "warning", title: "End game?", html: "finish adjusts to the current time <br/> or <br/> finish based on the original time", showConfirmButton: true, confirmButtonText: "Just finish", showDenyButton: true, denyButtonColor: "indigo", denyButtonText: "finish proportionally", showCancelButton: true, allowOutsideClick: false, allowEscapeKey: false }).then((result) => {
                    if (result.isConfirmed) {
                      handleActionGame(val.id, "force-finish-rental", true);
                    } else if (result.isDenied) {
                      handleActionGame(val.id, "finish-rental", true);
                    }
                  });
                }}
              >
                End Game
              </button>
            )}
            </div>
          </td>
        </tr>
      );
    });
  };

  const updateTransaction = (newTransaction) => {
    if (newTransaction) {
      setTransaction(newTransaction);
      setChangeStatus(!changeStatus);
    }
  };

  const handlePageClick = (e) => {
    const number = e.selected + 1;
    setCurrentPage(number);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("/api/rental?keyword=" + searchValue);
      setRentalsAll(data.data);
      setPageCount(data.meta.last_page);
      setCurrentPage(data.meta.current_page);
      setTriggerNotif(!triggerNotif);
      if (data.data.length < 1) {
        Swal.fire({ icon: "warning", title: "Not found!", html: `'${searchValue}' in booking not found`, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false }).then((result) => {
          if (result.isConfirmed) {
            setRentalsAll(originalRentals);
            setPageCount(originalCount);
            setCurrentPage(originalCurrent);
          }
        });
      }
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
    }
  };

  return (
    <>
      {/* left */}
      <div className="row mt-3 mt-5">
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
                  <button className="btn btn-sm w-100 mt-2" onClick={() => handleCheckDetail(bookingCode)} style={{ background: "#B21830", color: "white" }}>
                    Check Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9" style={{ marginLeft: "-5px" }}>
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

          <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg" width="90%" id="modal-show-detail">
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
                          <th width={"1%"}>No</th>
                          <th width={"40%"}>Start s/d Finish</th>
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
                    <div className="d-flex justify-content-between align-items-center">
                      {!rentals.every(rental => rental.status === 'C') && <span className={transaction.isPaymentDone ? "text-success" : "text-danger"}>{transaction.isPaymentDone ? " Already paid" : " Not paid yet"}</span>}
                      <div></div>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          const hasUnfinished = rentals.some(rental => rental.status !== 'F' && rental.status !== 'C');

                          if (hasUnfinished) {
                            Swal.fire({ icon: "warning", title: "Warning", html: "You can't pay it before finishing all", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
                          } else {
                            setShowPaymentForm(true);
                            setShowDetail(false);
                          }
                        }}
                        disabled={transaction.isPaymentDone || rentals.every(rental => rental.status === 'C')}
                      >
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
            <Row className="">
              <Col className="col-12 col-md-4" style={{ marginTop: -20 }}>
                <Form.Group className="inputSearch">
                  <Form onSubmit={handleSearch}>
                    <FormInput type="text" name="search" value={searchValue} icon={<Search />} onChange={(e) => setSearchValue(e.target.value)} placeholder="Enter to search" />
                  </Form>
                </Form.Group>
              </Col>
            </Row>
            {/* <div className="row">
              <div className="col-12 col-md-4" style={{ marginTop: -20 }} >
                <div className="inputSearch">
                  <form onSubmit={handleSearch}>
                    <input type="text" name="search" value={searchValue} icon={<Search />} onChange={(e) => setSearchValue(e.target.value)} placeholder="Enter to search" />
                  </form>
                </div>
              </div>
            </div> */}
            <div className="table-responsive">
              <table className="table table-hover mt-3" border={1}>
                <thead>
                  <tr>
                    <th width={"1%"}>No</th>
                    <th width={"10%"}>Booking Code</th>
                    <th width={"15%"}>Name Customer</th>
                    <th width={"15%"}>Court</th>
                    <th width={"28%"}>Start - Finish</th>
                    <th width={"5%"} className="text-center">
                      Status
                    </th>
                    <th width={"10%"} className="text-center">
                      Action
                    </th>
                    <th width="6%" className="text-center">
                      Detail
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
      <PaymentForm isShow={showPaymentForm} handleClose={() => setShowPaymentForm(false)} transaction={transaction} swal={Swal} updateTransaction={updateTransaction} setShowDetail={setShowDetail} sendReceipt={sendReceipt} />
      <FormUpdateStartFinish isShow={showUpdateRental} handleClose={() => {
        if (showDetail === true) {
          document.getElementById("modal-show-detail").classList.toggle('invisible')
        }
        setShowUpdateRental(false)
      }} dataBefore={rentalWillUpdated} booking={bookingData} swal={Swal} setChangeStatus={setChangeStatus} changeStatus={changeStatus} handleCheckDetail={handleCheckDetail} />
    </>
  );
};

export default Verification;
