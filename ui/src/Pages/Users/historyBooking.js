import React, {useEffect, useState} from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Trash3, Search, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FormInput from "../../Components/Form/input";
import ModalConfirmDelete from "../../Components/ModalDialog/modalConfirmDelete";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import secureLocalStorage from "react-secure-storage";
import ReactPaginate from "react-paginate";

const HistoryBooking = () => {
      
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [item_id, set_item_id] = useState('')

    const handleShow = (index, id) => {
        set_item_id(id)
        setDeleteId(index);
        setShow(true)
    };

    const [rentals, setRentals] = useState([])
    const [ originalRentals, setOriginalRentals ] = useState([])

    useEffect(() => {
        axios.get('/api/booking-history', {
            headers: {
                Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
            }
        })
        .then(({data}) => {
            setRentals(data)
            setOriginalRentals(data)
        }).catch((e) => {
            Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
        })
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get('/api/booking-history?keyword=' + values.search, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
                }
            })
            setRentals(data)
            if (data.length < 1) {
                Swal.fire({ icon: "warning", title: "Not found!", html: `'${values.search}' in booking not found`, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
                    .then((result) => {
                        if (result.isConfirmed) {
                            setRentals(originalRentals)
                        }
                    })
            }
        } catch (e) {
            Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
        }
    }

    const handleYes = async (e) => {
        e.preventDefault()
        try {
            await axios.get('/sanctum/csrf-cookie')
            const { data } = await axios.delete('/api/booking-history/' + item_id, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
                }
            })
            tableRowRemove(deleteId)
            Swal.fire({
                icon: "success", title: "Success!", html: data.message,
                showConfirmButton: false, allowOutsideClick: false,
                allowEscapeKey: false, timer: 2000
            });
            setShow(false)
        } catch {
            if (e?.response?.status === 404 || e?.response?.status === 403) {
                Swal.fire({
                    icon: "error", title: "Error!", html: e.response.data, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
                });
            } else {
                Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
            }
        }
    };

    const [values, setValues] = useState({ search: "" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    // let listData = [
    //     {name:"Hodijah", court:"Court A", schedule:"10.00-11.00", totally_hour:"1 hour", totally_price:"Rp 50,000", status:"Finished", status_color:"green"},
    //     {name:"Siti", court:"Court C", schedule:"10.00-11.00", totally_hour:"1 hour", totally_price:"Rp 50,000", status:"on progress", status_color:"orange"},
    // ];

    const TableRows = ({ rows }) => {
        return rows.map((val, index) => {
          return (
            <tr key={val.id}>
                <td>{index + 1}</td>
                <td>{val.customer.name} ({val.customer.phone_number})</td>
                  <td>{val.court.label} ({new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val.court.initial_price)}) </td>
                <td><span>{val.start}</span> - <span>{val.finish}</span></td>
                <td>{val.transaction.total_hour}</td>
                  <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val.transaction.total_price)}</td>
                <td className="text-center">{(val.status === 'B' ? 'Booked' : (val.status === 'O' ? 'On progress' : 'Finished'))}</td>
                <td className="text-center">
                    <a href="#delete" onClick={() => handleShow(index, val.id)}>
                        <Trash3 className="material-icons" color="dark" title="Delete" />
                    </a>
                </td>
            </tr>
          )
        });
    }

    const tableRowRemove = (index) => {
        const dataRow = [...rentals];
        dataRow.splice(index, 1);
        setRentals(dataRow);
    };

    // const handlePageClick = (e) => {
    //     const number = e.selected + 1
    //     setCurrentPage(number)
    // }

    return (
    <>
        <h4><b>History Booking</b></h4>
        <Card className="p-3 mt-5" style={{ marginLeft: "-18px" }}>
            <Row className="">
                <Col className="col-12 col-md-4" style={{marginTop:-20}}>
                    <Form.Group className="inputSearch" >
                        <Form onSubmit={handleSearch}>
                            <FormInput type="text" name="search" value={values.search} icon={<Search />} onChange={onChange} placeholder="Enter to search" />
                        </Form>
                    </Form.Group>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-3" border={1}>
                    <thead>
                        <tr >
                            <th width={'1%'}>No</th>
                            <th width={'20%'}>Name Customer</th>
                            <th width={'15%'}>Court</th>
                            <th width={'30%'}>Start - Finish</th>
                            <th width={'10%'}>Totally hour</th>
                            <th width={'10%'}>Totally Price</th>
                            <th width={'10%'} className="text-center">Status</th>
                            <th width={'4%'} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRows
                            rows={rentals}
                        />
                    </tbody>
                </table>
                <div className="clearfix">
                        {/* <ReactPaginate
                            className="pagination"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                        /> */}
                </div>
            </div>
        </Card>
        <ModalConfirmDelete show={show} handleClose={() => setShow(false)} handleYes={handleYes}/>
    </>
    )
}

export default HistoryBooking;