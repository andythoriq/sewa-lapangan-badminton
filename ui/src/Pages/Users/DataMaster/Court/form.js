import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Card, Row, Col, Image} from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import FormTextarea from "../../../../Components/Form/textarea";
import { imgDefault } from "../../../../Components/Services/config";
import { msgAlertWarning } from "../../../../Components/Alert";
import { ArrowLeft } from "react-bootstrap-icons";

import Swal from "sweetalert2";
import axios from "../../../../api/axios";
import axiosFormData from "../../../../api/axiosFormData";

const CourtForm = () => {
    const {id} = useParams();
    const [ imagePreview, setImagePreview ] = useState('')
    const [values, setValues] = useState({ label:"", price:"", description: "" });
    const [errors, setErrors] = useState([])
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

    const handleSubmitClick = async (e) => {
        e.preventDefault()
        const data = {
            label: values.label,
            initial_price: values.price,
            description: values.description,
            image_path: image[0]?.file ?? ''
        }
        const formData = new FormData();
        formData.append('label', data.label)
        formData.append('initial_price', data.initial_price)
        formData.append('description', data.description)
        formData.append('image_path', data.image_path)
        
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.get('/sanctum/csrf-cookie')
            let response
            if (id > 0) {
                formData.append('old_image', imagePreview)
                response = await axiosFormData.post('/api/court/' + id, formData, config)
            } else {
                response = await axiosFormData.post('/api/court', formData, config);
            }
            setErrors('');
            Swal.fire({ icon: "success", title: "Success!", html: response.data.message, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
            setTimeout(function () {
                window.location.href = "/data-master/court";
            }, 2000);
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            } else if (e.response?.status === 404 || e.response?.status === 403) {
                Swal.fire({
                    icon: "error", title: "Error!", html: e.response.data, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 1500
                });
                setTimeout(function () { window.location.href = "/" }, 1500);
            } else {
                console.error(`Error : ${e}`)
            }
        }
    };

    useEffect(() => {
        if (id > 0) {
            axios.get('/api/court-edit/' + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setValues({
                    ...values,
                    label: data.label,
                    price: data.initial_price,
                    description: data.description
                })
                setImagePreview(data.image_path)
            })
            .catch((e) => {
                console.error(`Error : ${e}`) 
            });
        }
    }, [])

  return (
    <>
        <h4><b>
            <Link to="/data-master/court" className="btnBack"><ArrowLeft/></Link>
            {id? "Edit":"Create"} Court
            </b>
        </h4>
        <Card className="p-3 mt-5" style={{ marginLeft: "-18px" }}>
            <Form encType="multipart/form-data">
            <Row>
                <Col className="col-12 col-md-6">
                    <Form.Group>
                        <FormInput type="text" name="label" label="Label" value={values.label} onChange={onChange}/>
                        {errors.label && 
                            <span className="text-danger">{errors.label[0]}</span>}
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                    <Form.Group>
                        <FormInput type="text" name="price" label="Price" value={values.price} onChange={onChange}/>
                        {errors.initial_price && 
                            <span className="text-danger">{errors.initial_price[0]}</span>}
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6">
                    <Form.Group>
                        <FormTextarea name="description" label="Description" value={values.description} onChange={onChange} style={{ height: "150px" }}/>
                        {errors.description && 
                            <span className="text-danger">{errors.description[0]}</span>}
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
                    {errors.image_path && 
                            <span className="text-danger">{errors.image_path[0]}</span>}
                </Col>
                <Col className="col-12 col-md-6 text-right pt-3">
                    <button onClick={handleSubmitClick} type="button" className="btn btn-danger me-md-4">
                        Save
                    </button>
                </Col>
            </Row>
            </Form>
        </Card>
        { imagePreview &&
            <Row className="justify-content-center">
                  <Card className="col-4 col-md-4 p-3 mt-5">
                      <span className="text-small">Previous image: </span>
                      <Image src={process.env.REACT_APP_BACKEND_URL + '/storage/' + imagePreview} className="imgView" title={values.label} height={250} />
                  </Card>
            </Row>
        }
    </>
  );
};

export default CourtForm;
