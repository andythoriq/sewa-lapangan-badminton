import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import CreateBookingFormRegular from "./regular";
import CreateBookingFormMember from "./member";
import { ArrowLeft } from "react-bootstrap-icons";

const CreateBookingForm = () => {

    const [checkedRegular, setCheckedRegular] = useState(true);
    const [checkedMember, setCheckedMember] = useState(false);

    const handleRadioBtn = (aksi='') => {
        // console.log(aksi);
        if (aksi==='member') {
            setCheckedRegular(false);
            setCheckedMember(true);
        }else{
            setCheckedRegular(true);
            setCheckedMember(false);
        }
    }

  return (
    <>
        <h4><b>
            <Link to="/dashboard" className="btnBack"><ArrowLeft/></Link>
                Create booking
            </b>
        </h4>
        <Row>
            <Col>
                <Card className="p-3 mt-5">
                    <div className="d-flex">
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="radionExam" value="regular" defaultChecked={checkedRegular} onClick={()=>handleRadioBtn('regular')} />
                            <label style={{ fontSize: "16px" }}>Regular</label>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" name="radionExam" value="member" defaultChecked={checkedMember} onClick={()=>handleRadioBtn('member')} />
                            <label style={{ fontSize: "16px" }}>Member</label>
                        </div>
                    </div>
                    {
                        checkedRegular ? <CreateBookingFormRegular/>:<CreateBookingFormMember/>
                    }
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default CreateBookingForm;