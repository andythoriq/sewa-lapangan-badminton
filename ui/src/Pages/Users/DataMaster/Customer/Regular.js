import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Pencil, Trash3, Search, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FormInput from "../../../../Components/Form/input";
import ModalConfirmDelete from "../../../../Components/ModalDialog/modalConfirmDelete";
import Swal from "sweetalert2";
import axios from "../../../../api/axios";

const Regular = () => {
    const [show, setShow] = useState(false);
    const [customerCode, setCustomerCode] = useState("");
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
            const { data } = await axios.delete('/api/customer/regular/' + customerCode, {
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
                    icon: "error", title: "Error!", html: e.response.data, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
                });
            } else {
                Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
            }
        }
    };

    const [regulars, setRegulars] = useState([])
    const [originalRegulars, setOriginalRegulars] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get('/api/customer/regular?keyword=' + values.search,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRegulars(data)
            if (data.length < 1) {
                Swal.fire({ icon: "warning", title: "Not found!", html: `'${values.search}' in regular not found`, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
                .then((result) => {
                    if (result.isConfirmed) {
                        setRegulars(originalRegulars)
                    }
                })
            }
        } catch (e) {
            Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        }
    }

    useEffect(() => {
        axios.get('/api/customer/regular', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(({data}) => {
            setRegulars(data)
            setOriginalRegulars(data)
        }).catch((e) => {
            Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        })
    }, [])

    const [values, setValues] = useState({ search: "" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const TableRows = ({ rows }) => {
        return rows.map((val, index) => {
          return (
            <tr key={val.customer_code}>
                <td>{index + 1}</td>
                <td>{val.name}</td>
                <td>{val.phone_number}</td>
                <td>{(val.deposit > 0 ? 'Rp ' + val.deposit : 0 )}</td>
                <td>{(val.debt > 0 ? 'Rp ' + val.debt : 0)}</td>
                <td className="text-center"><label className={`badge text-bg-${val.status === 'Y' ? 'green' : 'danger'} text-dark`}>{(val.status === 'Y' ? 'active' : 'in active' )}</label></td>
                <td className="text-center">
                    <Link to={'/data-master/customer-regular/edit/'+val.customer_code} className="edit">
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
        const dataRow = [...regulars];
        dataRow.splice(index, 1);
        setRegulars(dataRow);
    };

    return (
    <>
        <h4><b>Customer Regular</b></h4>
        <Card className="p-3 mt-5" style={{ marginLeft: "-18px" }}>
            <Row>
                <Col className="col-12 col-md-4" style={{marginTop:-20}} >
                    <Form.Group className="inputSearch">
                        <Form onSubmit={handleSearch}>
                            <FormInput type="text" name="search" value={values.search} icon={<Search/>} onChange={onChange} placeholder="Enter to search"/>
                        </Form>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6 pt-1">
                    <Link to={'/data-master/customer-regular/add'} className="btn btn-danger btn-sm add">
                        + Add Regular Customer
                    </Link>
                </Col>
                {/* <Col className="col-12 col-md-12">
                    <div className="float-right"><div className="bullet bullet-red"></div> <div className="bullet-text">In Active</div></div>
                    <div className="float-right"><div className="bullet bullet-cyan"></div> <div className="bullet-text">Active</div></div>
                </Col> */}
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-2" border={1}>
                    <thead>
                        <tr>
                            <th width={'1%'}>No</th>
                            <th width={'15%'}>Name</th>
                            <th width={'20%'}>Phone number</th>
                            <th width={'25%'}>Deposit</th>
                            <th width={'30%'}>Debt</th>
                            <th width={'10%'} className="text-center">Status</th>
                            <th width={'4%'} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRows
                            rows={regulars}
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

export default Regular;