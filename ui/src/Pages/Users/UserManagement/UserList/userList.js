import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Pencil, Trash3, Search} from "react-bootstrap-icons";
import FormInput from "../../../../Components/Form/input";
import ModalConfirmDelete from "../../../../Components/ModalDialog/modalConfirmDelete";
import Swal from "sweetalert2";
import axios from "../../../../api/axios";
import ReactPaginate from 'react-paginate';
import secureLocalStorage from "react-secure-storage";

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
    const [originalUsers, setOriginalUsers] = useState([])

    const [ currentPage, setCurrentPage ] = useState(0)
    const [ pageCount, setPageCount ] = useState(0)

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get('/api/admin?keyword=' + values.search,{
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
                }
            });
            setUsers(data.data)
            if (data.data.length < 1) {
                Swal.fire({ icon: "warning", title: "Not found!", html: `'${values.search}' in user not found`, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
                .then((result) => {
                    if (result.isConfirmed) {
                        setUsers(originalUsers)
                    }
                })
            }
        } catch (e) {
            Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        }
    }

    useEffect(() => {
        axios.get('/api/admin?page=' + currentPage, {
            headers: {
                Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
            }
        })
        .then(({data}) => {
            setUsers(data.data);
            setOriginalUsers(data.data)
            setPageCount(data.meta.last_page)
            setCurrentPage(data.meta.current_page)
        })
        .catch((e) => {
            Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        });
    }, [currentPage]);

    const handleYes = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
            const { data } = await axios.delete('/api/admin/' + deleteId, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
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
            if (e?.response?.status === 404 || e?.response?.status === 403) {
                Swal.fire({
                    icon: "error", title: "Error!", html: e.response.data, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
                });
            }else{
                Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
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

    const TableRows = ({ rows }) => {
        return rows.map((val, index) => {
          return (
            <tr key={val.id}>
                <td>{index + 1}</td>
                <td>{val.name}</td>
                <td>{val.username === secureLocalStorage.getItem('username') ? val.username + ' (YOU)' : val.username }</td>
                <td>{val.role}</td>
                <td className="text-center"><label className={`badge text-bg-${val.status === 'Y' ? 'green' : 'danger'} text-dark`}>{(val.status === 'Y' ? 'active' : 'in active' )}</label></td>
                <td className="text-center">
                    <Link to={'/user-management/user-list/edit/'+val.id} className="edit">
                        <Pencil className="material-icons ms-1" color="dark" title="Edit"/>
                    </Link>
                    &nbsp;&nbsp;
                    <a href="#delete" onClick={() => handleDelete(val.id, index)}>
                          <Trash3 className="material-icons" color="dark" title="Delete" />
                    </a>
                </td>
            </tr>
          )
        });
    }

    const handlePageClick = (e) => {
        const number = e.selected + 1
        setCurrentPage(number)
    }

    return (
    <>
        <h4><b>User List</b></h4>
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
                    <Link to={'/user-management/user-list/add'} className="btn btn-danger btn-sm add">
                        + Add User
                    </Link>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-3" border={1}>
                    <thead>
                        <tr>
                            <th width={'1%'}>No</th>
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
                        />
                    </tbody>
                </table>
                <div className="clearfix">
                    {/* <ul className="pagination ms-2">
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
                    </ul> */}
                    <ReactPaginate
                        className="pagination"
                        pageLinkClassName="page-link"
                        breakLabel="..."
                        nextLabel=" >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< "
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </Card>
        <ModalConfirmDelete show={show} handleClose={ () => setShow(!show)} handleYes={handleYes}/>
    </>
    )
}

export default UserList;