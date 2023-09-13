import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Card, Row, Col } from "react-bootstrap";
import FormInput from "../../../../Components/Form/input";
import FormSelect from "../../../../Components/Form/select";
import { ArrowLeft, Trash3 } from "react-bootstrap-icons";

const UserRoleForm = () => {
    const {id} = useParams();
    const [values, setValues] = useState({ rolename:"" });
    const onChange = (e) => { 
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    let dataMenu = [
        {value:"", label:""},
        {value:"1", label:"Master data - lapangan"},
        {value:"2", label:"User management - user list"},
        {value:"3", label:"User management - user level"},
        {value:"4", label:"Master data - regular customer"},
        {value:"5", label:"Master data - customer member"},
        {value:"6", label:"Master data - schedule"},
    ];

    const TableRows = ({ rows, tableRowRemove, onValUpdate, onCheckUpdate }) => {
        return rows.map((rowsData, index) => {
          const { list_menu, menu, check } = rowsData;
          return (
            <tr key={index}>
                <td className="text-center">
                    <span className="custom-checkbox">
                        <input type="checkbox" id={`check${index}`} name="check" defaultChecked={check} onChange={(event) => onCheckUpdate(index, event)}/>
                        <label htmlFor={`check${index}`}></label>
                    </span>
                </td>
                <td>
                    <FormSelect
                        name="menu"
                        className="form-select form-select-sm"
                        options={list_menu}
                        selected={menu}
                        onChange={(event) => onValUpdate(index, event)}
                    />
                </td>
                <td className="text-center">
                    <a href="#delete" onClick={() => tableRowRemove(index)}>
                        <Trash3 className="material-icons" color="dark" title="Delete" />
                    </a>
                </td>
            </tr>
          )
        });
    }

    const dataDefault = { list_menu: dataMenu, menu:"", check:false };
    const [rows, initRow] = useState([dataDefault]);
    
    const addRowTable = () => {
        initRow([...rows, dataDefault]);
    };
    const tableRowRemove = (index) => {
        const dataRow = [...rows];
        dataRow.splice(index, 1);
        initRow(dataRow);
    };
    const onValUpdate = (i, event) => {
        const { name, value } = event.target;
        const data = [...rows];
        data[i][name] = value;
        // console.log(data);
        initRow(data);
    };
    const onCheckUpdate = (i, event) => {
        // console.log(event);
        const { name, checked } = event.target;
        const data = [...rows];
        data[i][name] = checked;
        initRow(data);
    }

  return (
    <>
        <h4><b>
            <Link to="/user-management/user-role" className="btnBack"><ArrowLeft/></Link>
            {id? "Edit":"Create"} user role
            </b>
        </h4>
        <Row>
            <Col className="col-12 col-md-8 m-auto">
            <Card className="p-3 mt-5">
                <Form>
                <Row>
                    <Col className="col-12 col-md-6" style={{marginTop:-20}}>
                        <Form.Group>
                            <FormInput type="text" label="Rolename" name="rolename" value={values.rolename} onChange={onChange} placeholder="Enter rolename"/>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="table-responsive">
                    <table className="table table-hover mt-3" border={1}>
                        <thead>
                            <tr>
                                <th width={'1%'}></th>
                                <th width={'90%'}>Menu</th>
                                <th width={'9%'} className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRows
                                rows={rows}
                                tableRowRemove={tableRowRemove}
                                onValUpdate={onValUpdate}
                                onCheckUpdate={onCheckUpdate}
                            />
                        </tbody>
                    </table>
                </div>
                <center>
                    <button type="button" className="btn btn-danger btn-sm" onClick={addRowTable}>
                        + Add
                    </button>
                </center>
                <div className="d-flex mt-2">
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
                <div className="text-right">
                    <button type="button" className="btn btn-danger btn-sm">
                        Save
                    </button>
                </div>
                </Form>
            </Card>
            </Col>
        </Row>
    </>
  );
};

export default UserRoleForm;
