import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button  } from "react-bootstrap";
import axios from "../../../api/axios";

const ScheduleModal = ({isShow, handleClose, size="md", rentalId, swal}) => {
    const [rental, setRental] = useState({})

    useEffect(() => {
        if (rentalId > 0) {
            axios.get('/api/rental/' + rentalId)
                .then(({ data }) => {
                    setRental(data)
                })
                .catch((e) => {
                    swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
                })
        }
    }, [rentalId])
    return (
        <>
        <Modal show={isShow} onHide={handleClose} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>Court Test</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="col-12 col-lg-4">
                        <table id="modalTable" width={'100%'}>
                            <tbody>
                                <tr>
                                    <td width={'10%'}>Name&nbsp;customer</td>
                                    <td width={'1%'}>&nbsp;:&nbsp;</td>
                                    <td width={'89%'}>{rental.customer?.name}</td>
                                </tr>
                                <tr>
                                    <td width={'10%'}>Phone&nbsp;number</td>
                                    <td width={'1%'}>&nbsp;:&nbsp;</td>
                                    <td width={'89%'}>{rental.customer?.phone_number}</td>
                                </tr>
                                <tr>
                                    <td>Member&nbsp;status</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{rental.customer?.membership_status === 'M'?'Member':'Regular'}</td>
                                </tr>
                                <tr>
                                    <td>Booking&nbsp;at</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{rental.created_at}</td>
                                </tr>
                                <tr>
                                    <td>Input&nbsp;by</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{rental.admin?.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col className="col-12 col-lg-4">
                        <table id="modalTable" width={'100%'}>
                            <tbody>
                                <tr>
                                    <td width={'10%'}>Court</td>
                                    <td width={'1%'}>&nbsp;:&nbsp;</td>
                                    <td width={'89%'}>{rental.court?.label} ({new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(rental.court?.initial_price)})</td>
                                </tr>
                                <tr>
                                    <td>Range&nbsp;date</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{rental.start} - {rental.finish} ({new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(rental.price)})</td>
                                </tr>
                                <tr>
                                    <td>Duration</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{rental.duration_hour} hours ({rental.duration_minute} minutes)</td>
                                </tr>
                                <tr>
                                    <td>Condition</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{rental.status === "B" ? "Up coming" : rental.status === "O" ? "On progress" : rental.status === "F" ? "Finished" : "Canceled"}</td>
                                </tr>
                                <tr>
                                    <td>Booking&nbsp;code</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{rental.transaction?.booking_code}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col className="col-12 col-lg-4">
                        <table id="modalTable" width={'100%'}>
                            <tbody>
                                <tr>
                                    <td width={'10%'}>Total&nbsp;Hour</td>
                                    <td width={'1%'}>&nbsp;:&nbsp;</td>
                                    <td width={'89%'}>{rental.transaction?.total_hour > 1 ? rental.transaction?.total_hour + ' hours' : rental.transaction?.total_hour + ' hour'}</td>
                                </tr>
                                <tr>
                                    <td width={'10%'}>Total&nbsp;Price</td>
                                    <td width={'1%'}>&nbsp;:&nbsp;</td>
                                    <td width={'89%'}>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(rental.transaction?.total_price)}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{rental.transaction?.isPaymentDone?'Payment done':'not paid yet'}</td>
                                </tr>
                                <tr>
                                    <td>Pay</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(rental.transaction?.customer_paid)}</td>
                                </tr>
                                <tr>
                                    <td>Deposit</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(rental.transaction?.customer_deposit)}</td>
                                </tr>
                                <tr>
                                    <td>Debt</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(rental.transaction?.customer_debt)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Close </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ScheduleModal;