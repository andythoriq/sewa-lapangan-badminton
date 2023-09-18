import React, {useState} from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Search, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FormInput from "../../Components/Form/input";

const RiwayatBooking = () => {

    const [values, setValues] = useState({ search: "" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
    <>
        <Card className="p-3 mt-5">
            <Row className="">
                <Col className="col-12 col-md-4" style={{marginTop:-20}}>
                    <Form.Group className="inputSearch" >
                        <FormInput type="text" name="search" value={values.search} icon={<Search/>} onChange={onChange} placeholder="Search"/>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-8 pt-3">
                    <div className="float-right"><div className="bullet bullet-orange"></div> <div className="bullet-text">On Progress</div></div>
                    <div className="float-right"><div className="bullet bullet-green"></div> <div className="bullet-text">Finished</div></div>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-3" border={1}>
                    <thead>
                        <tr>
                            <th width={'1%'}></th>
                            <th width={'30%'}>Name Customer</th>
                            <th width={'10%'}>Court</th>
                            <th width={'15%'}>Schedule</th>
                            <th width={'15%'}>Totally hour</th>
                            <th width={'15%'}>Totally Price</th>
                            <th width={'10%'} className="text-center">Status</th>
                            
                        </tr>
                    </thead>
                </table>
                <div className="clearfix">
                    <ul className="pagination ms-2">
                        <li className="page-item">
                            <a href="#previous" className="page-link prev"><ChevronLeft/></a>
                        </li>
                        <li className="page-item">
                            <a href="#1" className="page-link">1</a>
                        </li>
                        <li className="page-item">
                            <a href="#2" className="page-link">2</a>
                        </li>
                        <li className="page-item">
                            <a href="#next" className="page-link next"><ChevronRight/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </Card>
    </>
    )
}

export default RiwayatBooking;