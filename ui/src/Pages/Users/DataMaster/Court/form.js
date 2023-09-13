import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Card, Row, Col, Image } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import FormTextarea from "../../../../Components/Form/textarea";
import { imgDefault } from "../../../../Components/Services/config";
import { msgAlertWarning } from "../../../../Components/Alert";
import { ArrowLeft } from "react-bootstrap-icons";

const CourtForm = () => {
    const {id} = useParams();
    const [values, setValues] = useState({ label:"", price:"" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const [image, setImage] = useState([]);
    const inputRef = useRef(null);
    const handleImageClick = () => inputRef.current.click();

    const handleImageChange = (e) => {
        // console.log(e.target.files);
        const file = e.target.files;
        handleFileUpload(file);
    }

    const handleFileUpload = async (file) => {
        if (!file.length) return false;
        let fileImg=[];
        for (let i = 0; i < file.length; i++) {
            const filenya = file[i];
            const fileExtension = filenya.name.split(".").at(-1);
            const allowedFileTypes = ["jpg", "jpeg", "png"];
            if (!allowedFileTypes.includes(fileExtension)) {
                msgAlertWarning(`File tidak mendukung. Jenis file harus <b>${allowedFileTypes.join(", ")}</b>`);
                return false;
            }
            if (file.size > 102400) {
                msgAlertWarning(`Ukuran file terlalu besar, maksimal ukuran file <b>100 kb</b>`);
                return false;
            }
            fileImg.push({file:filenya, name:filenya.name});
        }
        // console.log(fileImg);
        if (!fileImg) return false;
        setImage(fileImg);
    }

  return (
    <>
        <h4><b>
            <Link to="/data-master/court" className="btnBack"><ArrowLeft/></Link>
            {id? "Edit":"Create"} Court
            </b>
        </h4>
        <Card className="p-3 mt-5">
            <Form>
            <Row>
                <Col className="col-12 col-md-6">
                    <Form.Group>
                        <FormInput type="text" name="label" label="Label" value={values.label} onChange={onChange}/>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                    <Form.Group>
                        <FormInput type="text" name="price" label="Price" value={values.price} onChange={onChange}/>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                    <Form.Group>
                        <FormTextarea name="description" label="Description" value={values.description} onChange={onChange} style={{ height: "150px" }}/>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                    <label>Upload Image</label>
                    <input className="form-control" type="file" ref={inputRef} onChange={(e)=>handleImageChange(e)} accept=".jpg, .jpeg, image/png" multiple hidden></input>
                    <div className="boxImg" onClick={()=>handleImageClick()}>
                    <center>
                        {
                            image.length ? 
                            <>
                                {
                                    image.map((val, key) => (
                                        <Image src={URL.createObjectURL(val.file)} className="imgView" key={key} title={val.name}/>
                                    ))
                                }
                            </>
                            :
                            <>
                                <Image src={imgDefault} className="imgDefault" title="Upload"/><br/>
                                <div className="btn btn-danger">Upload</div>
                            </>
                        }
                    </center>
                    </div>
                </Col>
                <Col className="col-12 col-md-6">
                    <label>Status</label>
                    <div className="d-flex">
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="radionExam" />
                            <label>Active</label>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" name="radionExam" />
                            <label>In active</label>
                        </div>
                    </div>
                </Col>
                <Col className="col-12 col-md-6 text-right pt-3">
                    <button type="button" className="btn btn-danger me-md-4">
                        Save
                    </button>
                </Col>
            </Row>
            </Form>
        </Card>
    </>
  );
};

export default CourtForm;
