import React from "react";
// import { Row, Col } from "react-bootstrap";
// import { dirIcon } from "../../../Components/Services/config";
import Schedule from "../Schedule/schedule";
import Info from "./info";
import FormatDate from "../../../Components/Services/formatDate";

const Dashboard = () => {
    const date = new Date();
    // let imgCard =[
    //     {name:"User",value:"0", icon:"users"},
    //     {name:"On Progress",value:"0", icon:"wait"},
    //     {name:"Finished",value:"0", icon:"audit"},
    // ];
    
    return (
    <>
        <h4 className="mb-4"><b>Dashboard</b></h4>
        <b>{FormatDate(date)}</b>
        {/* <Row className="mt-4 mb-4">
            <Col className="col-1"></Col>
            {imgCard.map((val, key) => (
            <Col className="col-12 col-lg-3" key={key}>
                <div className="card bg-danger mb-3 shadow" style={{minHeight:100,cursor:'pointer'}}>
                    <div className="row g-0" style={{padding:'5px 20px 5px 20px'}}>
                        <div className="col-4 text-center pt-2">
                            <img src={`${dirIcon}${val.icon}.png`} className="img-fluid rounded-start" alt={val.name}/>
                        </div>
                        <div className="col-8 pt-1">
                        <div className="card-body text-white" style={{textAlign:'right'}}>
                            <h6 className="card-title"><u>{val.name}</u></h6>
                            {val.value}
                         </div>
                        </div>
                    </div>
                </div>
            </Col>))
            }
        </Row> */}
        <div className="mt-4 mb-4"></div>
        <Schedule aksi="dashboard"/>
        <Info/>
    </>);
}

export default Dashboard;