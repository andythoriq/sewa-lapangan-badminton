import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Pencil, Trash3, Search, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FormInput from "../../../../Components/Form/input";
import ModalConfirmDelete from "../../../../Components/ModalDialog/modalConfirmDelete";
import Swal from "sweetalert2";
import axios from "../../../../api/axios";

const Member = () => {
    const [show, setShow] = useState(false);
    const [customerCode, setCustomerCode] = useState('')
    const [deleteId, setDeleteId] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (index, code) => {
        setCustomerCode(code)
        setDeleteId(index);
        setShow(true)
    };

    const handleYes = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const { data } = await axios.delete('/api/customer/member/' + customerCode, {
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
        axios.get('/api/customer/member', {
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
            <tr key={val.customer_code}>
                <td className="text-center">
                    <span className="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                        <label htmlFor="checkbox1"></label>
                    </span>
                </td>
                <td>{val.name}</td>
                <td>{val.phone_number}</td>
                <td>{val.member_active_period}</td>
                <td>{val.deposit}</td>
                <td>{val.debt}</td>
                <td className="text-center"><label className={`badge text-bg-${val.status === 'Y' ? 'green' : 'danger'} text-dark`}>{val.status}</label></td>
                <td className="text-center">
                    <Link to={'/data-master/customer-member/edit/'+val.customer_code} className="edit">
                        <Pencil className="material-icons ms-1" color="dark" title="Edit"/>
                    </Link>
                    &nbsp;&nbsp;
                    <a href="#delete" onClick={()=>handleShow(index, val.customer_code)}>
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
        <h4><b>Customer Member</b></h4>
        <Card className="p-3 mt-5" style={{ marginLeft: "-18px" }}>
            <Row>
                <Col className="col-12 col-md-4" style={{marginTop:-20}} >
                    <Form.Group className="inputSearch">
                        <FormInput type="text" name="search" value={values.search} icon={<Search/>} onChange={onChange} placeholder="Search"/>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6 pt-1">
                    <Link to={'/data-master/customer-member/add'} className="btn btn-danger btn-sm add">
                        + Add Member Customer
                    </Link>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-2" border={1}>
                    <thead>
                        <tr>
                            <th width={'1%'}></th>
                            <th width={'15%'}>Name</th>
                            <th width={'15%'}>Phone number</th>
                            <th width={'20%'}>Active Peroid</th>
                            <th width={'15%'}>Deposit</th>
                            <th width={'15%'}>Debt</th>
                            <th width={'10%'} className="text-center">Status</th>
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

export default Member;