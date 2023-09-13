import React from "react";
import { Row, Col, Modal, Button  } from "react-bootstrap";

const ScheduleModal = ({show="", handleClose, size="md", data=[]}) => {
    var court = "";
    var name = "";
    if (data) {
        court = data.court;
        name = data.name;
    }
    return (
        <>
        <Modal show={show} onHide={handleClose} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>Court {court}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="col-12 col-lg-4">
                        <table id="modalTable" width={'100%'}>
                            <tbody>
                                <tr>
                                    <td width={'10%'}>Name&nbsp;customer</td>
                                    <td width={'1%'}>&nbsp;:&nbsp;</td>
                                    <td width={'89%'}>{name}</td>
                                </tr>
                                <tr>
                                    <td>Booking&nbsp;date</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Range&nbsp;date</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Totally&nbsp;duration</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td></td>
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
                                    <td width={'89%'}>{court}</td>
                                </tr>
                                <tr>
                                    <td>Input&nbsp;by</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Condition</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col className="col-12 col-lg-4">
                        <table id="modalTable" width={'100%'}>
                            <tbody>
                                <tr>
                                    <td width={'10%'}>Booking&nbsp;Payment</td>
                                    <td width={'1%'}>&nbsp;:&nbsp;</td>
                                    <td width={'89%'}></td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Member&nbsp;status</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Deposit</td>
                                    <td>&nbsp;:&nbsp;</td>
                                    <td></td>
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