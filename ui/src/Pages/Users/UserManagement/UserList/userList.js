import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Pencil, Trash3, Search, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FormInput from "../../../../Components/Form/input";
import ModalConfirmDelete from "../../../../Components/ModalDialog/modalConfirmDelete";
import Swal from "sweetalert2";
import axios from "../../../../api/axios";

const UserList = () => {
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState(0)
    const [ indexToSplice, setIndexToSplice] = useState("");
    
    const handleDelete = (id, index) => {
        setDeleteId(id)
        setIndexToSplice(index)
        setShow(!show)
    }

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get('/api/admin', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(({data}) => {
            setUsers(data);
        })
        .catch((e) => {
            console.error(`Error : ${e}`)
        });
    }, []);

    const handleYes = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
            const { data } = await axios.delete('/api/admin/' + deleteId, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            handleRemove()
            Swal.fire({
                icon: "success", title: "Success!", html: data.message,
                showConfirmButton: false, allowOutsideClick: false,
                allowEscapeKey: false, timer: 2000
            });
            setShow(false);
        } catch (e) {
            if (e.response.status === 404 || e.response.status === 403) {
                Swal.fire({
                    icon: "error", title: "Error!", html: e.response.data, showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 1500
                });
                setTimeout(function () { window.location.href = "/" }, 1500);
            }else{
                console.error(`Error : ${e}`)
            }
        }
    };

    const handleRemove = () => {
        const row = [ ...users ];
        row.splice(indexToSplice, 1);
        setUsers(row);
    };

    const [values, setValues] = useState({ search: "" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    // let listData = [
    //     {id:1, name:"Thoriq", email:"andythoriq@gmail.com", role:"Master Data - lapangan", status:"Active", status_color:"cyan"},
    //     {id:2, name:"uus", email:"uus_26@gmail.com", role:"Master Data - lapangan", status:"In active", status_color:"red"},
    // ];

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
                <td>{val.name}</td>
                <td>{val.username === localStorage.getItem('username') ? val.username + ' (YOU)' : val.username }</td>
                <td>{val.role}</td>
                <td className="text-center"><label className={`badge text-bg-${val.status === 'Y' ? 'green' : 'secondary'} text-dark`}>{val.status}</label></td>
                <td className="text-center">
                    <Link to={'/user-management/user-list/edit/'+val.id} className="edit">
                        <Pencil className="material-icons ms-1" color="dark" title="Edit"/>
                    </Link>
                    &nbsp;&nbsp;
                    {/* <a href="#delete" onClick={()=>handleShow(index)}>
                        <Trash3 className="material-icons" color="dark" title="Delete" />
                    </a> */}
                    <a href="#delete" onClick={() => handleDelete(val.id, index)}>
                          <Trash3 className="material-icons" color="dark" title="Delete" />
                    </a>
                </td>
            </tr>
          )
        });
    }
    // const [rows, initRow] = useState(listData);
    // const tableRowRemove = (index) => {
    //     const dataRow = [...rows];
    //     dataRow.splice(index, 1);
    //     initRow(dataRow);
    // };

    return (
    <>
        <h4><b>User List</b></h4>
        <Card className="p-3 mt-5" style={{ marginLeft: "-18px" }}>
            <Row>
                <Col className="col-12 col-md-4" style={{marginTop:-20}} >
                    <Form.Group className="inputSearch">
                        <FormInput type="text" name="search" value={values.search} icon={<Search/>} onChange={onChange} placeholder="Search"/>
                    </Form.Group>
                </Col>
                <Col className="col-12 col-md-6 pt-1">
                    <Link to={'/user-management/user-list/add'} className="btn btn-danger btn-sm add">
                        + Add User
                    </Link>
                </Col>
                {/* <Col className="col-12 col-md-12 pt-2">
                    <div className="float-right"><div className="bullet bullet-red"></div> <div className="bullet-text">In Active</div></div>
                    <div className="float-right"><div className="bullet bullet-cyan"></div> <div className="bullet-text">Active</div></div>
                </Col> */}
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-3" border={1}>
                    <thead>
                        <tr>
                            <th width={'1%'}></th>
                            <th width={'30%'}>Name</th>
                            <th width={'25%'}>Username</th>
                            <th width={'25%'}>Role</th>
                            <th width={'10%'} className="text-center">Status</th>
                            <th width={'9%'} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRows
                            rows={users}
                            // tableRowRemove={tableRowRemove}
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
        <ModalConfirmDelete show={show} handleClose={ () => setShow(!show)} handleYes={handleYes}/>
    </>
    )
}

export default UserList;