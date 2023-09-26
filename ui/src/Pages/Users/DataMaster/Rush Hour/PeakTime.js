import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Pencil, Trash3, Search, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FormInput from "../../../../Components/Form/input";
import ModalConfirmDelete from "../../../../Components/ModalDialog/modalConfirmDelete";
import Swal from "sweetalert2";
import axios from "../../../../api/axios";

const PeakTime = () => {
    const [show, setShow] = useState(false);
    const [peaktimeCode, setPeaktimeCode] = useState('')
    const [deleteId, setDeleteId] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (index, code) => {
        setPeaktimeCode(code)
        setDeleteId(index);
        setShow(true)
    };

    const handleYes = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const { data } = await axios.delete('/api/peak-time/' + peaktimeCode, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            tableRowRemove(deleteId);
            Swal.fire({icon:"success", title:"Success!", html: data.message,
            showConfirmButton: false, allowOutsideClick: false,
            allowEscapeKey:false, timer: 2000});
            setShow(false);
        } catch(e) {
            if (e?.response?.status === 404 || e?.response?.status === 403) {
                Swal.fire({
                    icon: "error", title: "Error!", html: e.response.data, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 1500
                });
                setTimeout(function () { window.location.href = "/" }, 1500);
            } else {
                Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
            }
        }
    };

    const [members, setMembers] = useState([])

    useEffect(() => {
        axios.get('/api/peak-time', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(({ data }) => {
            setMembers(data)
        }).catch((e) => {
            Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        })
    }, [])

    const [values, setValues] = useState({ search: "" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    // let listData = [
    //     {id:1, name:"Budi", no:"1", activeperiod:"19/09/2023", deposit:"", debt: "",},
    //     {id:2, name:"Ajeng", no:"2", activeperiod:"20/09/2023", deposit:"", debt: "",},
    // ];

    const TableRows = ({ rows }) => {
        return rows.map((val, index) => {
          return (
            <tr key={val.id}>
                <td>{index + 1}</td>
                <td>{val.day_name}</td>
                <td>Rp {val.price_increase}</td>
                <td>{val.start}</td>
                <td>{val.finish}</td>
                <td className="text-center">
                    <Link to={'/data-master/rush/edit/'+val.id} className="edit">
                        <Pencil className="material-icons ms-1" color="dark" title="Edit"/>
                    </Link>
                    &nbsp;&nbsp;
                    <a href="#delete" onClick={()=>handleShow(index, val.id)}>
                        <Trash3 className="material-icons" color="dark" title="Delete" />
                    </a>
                </td>
            </tr>
          )
        });
    }

    const tableRowRemove = (index) => {
        const dataRow = [...members];
        dataRow.splice(index, 1);
        setMembers(dataRow)
    };

    return (
    <>
        <h4><b>Peak Time</b></h4>
        <Card className="p-3 mt-5" style={{ marginLeft: "-18px" }}>
            <Row>
                <Col className="col-12 col-md-4" style={{marginTop:-20}} >
                    <Form.Group className="inputSearch">
                        <FormInput type="text" name="search" value={values.search} icon={<Search/>} onChange={onChange} placeholder="Search"/>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6 pt-1">
                    <Link to={'/data-master/rush/add'} className="btn btn-danger btn-sm add">
                        + Add Peak Time
                    </Link>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-2" border={1}>
                    <thead>
                        <tr>
                            <th width={'1%'}>No</th>
                            <th width={'15%'}>Day name</th>
                            <th width={'20%'}>Peak Time Price</th>
                            <th width={'15%'}>Start</th>
                            <th width={'15%'}>Finish</th>
                            <th width={'5%'} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRows
                            rows={members}
                        />
                    </tbody>
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
        <ModalConfirmDelete show={show} handleClose={handleClose} handleYes={handleYes}/>
    </>
    )
}

export default PeakTime;