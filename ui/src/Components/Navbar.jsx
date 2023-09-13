import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { namaApp, logoApp, dirIcon } from "./Services/config";
import { Container, Row, Col } from "react-bootstrap";
import { FunnelIcon, XMarkIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from '../Reducers/menuSlice';
import FormSelect from "./Form/select";

const Navbar = () => {
  const { menuSidebar } = useSelector(state => state.menu);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = () => setMenuOpen(!menuOpen);

  const handleToggle = () => {
    dispatch(setToggle({menuSidebar:!menuSidebar}));
    document.body.classList.toggle('sb-sidenav-toggled');
  }

  let dataCourt = [
    {value:"", label:"Open Court"},
    {value:"1", label:"One"},
    {value:"2", label:"Two"},
    {value:"3", label:"Three"},
  ];

  let dataCondition = [
    {value:"", label:"Open"},
    {value:"1", label:"One"},
    {value:"2", label:"Two"},
    {value:"3", label:"Three"},
  ];

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="/#" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }} >
      {children}
    </a>
  ));

  return (
    <nav className="navbar navbar-expand-lg bg-danger fixed-top">
      <Container>
        <div className="menu_bar_mobile" onClick={handleToggle}>{ (menuSidebar) ? <XMarkIcon/> : <Bars3BottomLeftIcon /> }</div>
        <Link to="/" className="navbar-brand">
          <img src={`/${logoApp}`} alt=""/>
          <b className="text-white" style={{paddingLeft:5, fontSize:20}}>{namaApp}</b>
        </Link>
        <div className="menu" onClick={toggle}>
          { menuOpen ? <XMarkIcon/> : <FunnelIcon /> }
        </div>
        <div className={menuOpen ? "menu_filter active" : "menu_filter inactive"}>
          <ul className={`filter text-white m-0${menuOpen ? " open" : ""}`}>
            <li key="filter0">
              <Row>
                <Col>
                  Start Date:
                  <input className="form-control form-control-sm" type="date" placeholder=".form-control-sm" style={{width:115}}></input>
                </Col>
                <Col>
                  End Date:
                  <input className="form-control form-control-sm" type="date" placeholder=".form-control-sm" style={{width:115}}></input>
                </Col>
              </Row>
            </li>
            <li key="filter1">
              Court:
              <FormSelect
                  className="form-select form-select-sm" 
                  style={{width:115,fontSize:12}}
                  options={dataCourt}
              />
            </li>
            <li key="filter2">
              Condition:
              <FormSelect
                  className="form-select form-select-sm" 
                  style={{width:115,fontSize:12}}
                  options={dataCondition}
              />
            </li>
          </ul>
        </div>
        <ul className={`menu2 m-0`}>
          <li>
            <NavLink to="/" className="">
              <img src={`${dirIcon}notif.png`} alt=""/>
            </NavLink>
          </li>
          <li>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <img src={`${dirIcon}user-circle.png`} alt=""/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1" href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;