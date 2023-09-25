import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Pencil, Trash3, Search, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FormInput from "../../../../Components/Form/input";
import ModalConfirmDelete from "../../../../Components/ModalDialog/modalConfirmDelete";
import Swal from "sweetalert2";
import axios from "../../../../api/axios";

const Court = () => {
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [item_id, set_item_id] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = (index, id) => {
        setDeleteId(index);
        set_item_id(id)
        setShow(true)
    };

    const handleYes = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const { data } = await axios.delete('/api/court/' + item_id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            tableRowRemove(deleteId);
            Swal.fire({icon:"success", title:"Success!", html: data.message, 
            showConfirmButton: false, allowOutsideClick: false,
            allowEscapeKey:false, timer: 2000});
        setShow(false);
        } catch (e) {
            if (e.response?.status === 404 || e.response?.status === 403) {
                Swal.fire({
                    icon: "error", title: "Error!", html: e.response.data, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 1500
                });
                setTimeout(function () { window.location.href = "/" }, 1500);
            } else {
                console.error(`Error : ${e}`)
            }
        }
    };

    const [values, setValues] = useState({ search: "" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    // let listData = [
    //     {id:1, court:"Court A", price:"Rp 50,000/hour", img:"", description:"", status:"Active", status_color:"cyan"},
    //     {id:2, court:"Court C", price:"Rp 50,000/hour", img:"", description:"", status:"In active", status_color:"red"},
    // ];

    const [courts, setCourts] = useState([]);

    useEffect(() => {
        axios.get('/api/court', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(({data}) => {
            setCourts(data);
        })
        .catch((e) => {
            console.error(`Error : ${e}`)
        });
    }, []);

    const TableRows = ({ rows }) => {
        return rows.map((val, index) => {
          return (
            <tr key={val.id}>
                <td className="text-center">
                    <span className="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                        <label htmlFor="checkbox1"></label>
                    </span>
                </td>
                <td>{val.label}</td>
                <td>{val.initial_price}</td>
                <td>{val.image_path ? (
                      <img src={process.env.REACT_APP_BACKEND_URL + '/storage/' + val.image_path} alt={val.label} height={150} width={150} />
                  ) : (
                      <span>No Image</span>
                  )}</td>
                <td>{val.description}</td>
                <td className="text-center">
                    <Link to={'/data-master/court/edit/'+val.id} className="edit">
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
        const dataRow = [...courts];
        dataRow.splice(index, 1);
        setCourts(dataRow)
    };

    return (
    <>
        <h4><b>Court</b></h4>
        <Card className="p-4 mt-5" style={{ marginLeft: "-18px" }}>
            <Row>
                <Col className="col-12 col-md-4" style={{marginTop:-20}} >
                    <Form.Group className="inputSearch">
                        <FormInput type="text" name="search" value={values.search} icon={<Search/>} onChange={onChange} placeholder="Search"/>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6 pt-1">
                    <Link to={'/data-master/court/add'} className="btn btn-danger btn-sm add">
                        + Add Court
                    </Link>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-2" border={1}>
                    <thead>
                        <tr>
                            <th width={'1%'}></th>
                            <th width={'10%'}>Court</th>
                            <th width={'15%'}>Price</th>
                            <th width={'15%'}>Image</th>
                            <th width={'45%'}>Description</th>
                            <th width={'4%'} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRows
                            rows={courts}
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

export default Court;