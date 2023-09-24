import React, {useState} from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Trash3, Search, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FormInput from "../../Components/Form/input";
import ModalConfirmDelete from "../../Components/ModalDialog/modalConfirmDelete";
import Swal from "sweetalert2";

const HistoryBooking = () => {
      
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setDeleteId(index);
        setShow(true)
    };

    const handleChange=(e)=>{ 
        const { name, checked}= e.target;
      if(name==="allselect")
      {
      const checkedvalue = ( (user)=>{ return {...user, isChecked:checked}});
      console.log(checkedvalue);
      } 
    }

    const handleYes = () => {
        tableRowRemove(deleteId);
        Swal.fire({icon:"success", title:"Success!", html:'Delete successfully', 
            showConfirmButton: false, allowOutsideClick: false,
            allowEscapeKey:false, timer: 2000});
        setShow(false);
    };

    const [values, setValues] = useState({ search: "" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    let listData = [
        {name:"Hodijah", court:"Court A", schedule:"10.00-11.00", totally_hour:"1 hour", totally_price:"Rp 50,000", status:"Finished", status_color:"green"},
        {name:"Siti", court:"Court C", schedule:"10.00-11.00", totally_hour:"1 hour", totally_price:"Rp 50,000", status:"on progress", status_color:"orange"},
    ];

    const TableRows = ({ rows }) => {
        return rows.map((val, index) => {
          return (
            <tr>
                <td className="text-center">
                    <span className="custom-checkbox">
                        <input type="checkbox" />
                        <label htmlFor="checkbox1"></label>
                    </span>
                </td>
                <td>{val.name}</td>
                <td>{val.court}</td>
                <td>{val.schedule}</td>
                <td>{val.totally_hour}</td>
                <td>{val.totally_price}</td>
                <td className="text-center"><label className={`badge text-bg-${val.status_color} text-dark`}>{val.status}</label></td>
                <td className="text-center">
                    <a href="#delete" onClick={() => handleShow(index)}>
                        <Trash3 className="material-icons" color="dark" title="Delete" />
                    </a>
                </td>
            </tr>
          )
        });
    }
    const [rows, initRow] = useState(listData);
    const tableRowRemove = (index) => {
        const dataRow = [...rows];
        dataRow.splice(index, 1);
        initRow(dataRow);
    };

    return (
    <>
        <h4><b>History Booking</b></h4>
        <Card className="p-3 mt-5" style={{ marginLeft: "-18px" }}>
            <Row className="">
                <Col className="col-12 col-md-4" style={{marginTop:-20}}>
                    <Form.Group className="inputSearch" >
                        <FormInput type="text" name="search" value={values.search} icon={<Search/>} onChange={onChange} placeholder="Search"/>
                    </Form.Group>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table table-hover mt-3" border={1}>
                    <thead>
                        <tr >
                            <th width={'1%'}><input type="checkbox" name="allselect" checked= { ( (user)=>user?.isChecked!==true)} onChange={ handleChange}/></th>
                            <th width={'30%'}>Name Customer</th>
                            <th width={'10%'}>Court</th>
                            <th width={'15%'}>Schedule</th>
                            <th width={'15%'}>Totally hour</th>
                            <th width={'15%'}>Totally Price</th>
                            <th width={'10%'} className="text-center">Status</th>
                            <th width={'4%'} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRows
                            rows={rows}
                            tableRowRemove={tableRowRemove}
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

export default HistoryBooking;