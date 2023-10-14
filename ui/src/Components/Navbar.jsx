import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { namaApp, logoApp, dirIcon } from "./Services/config";
import { Row, Col } from "react-bootstrap";
import { XMarkIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../Reducers/menuSlice";
import FormSelect from "./Form/select";
import axios from "../api/axios";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import Notification from "./Notificationn";
import { MultiSelect } from "react-multi-select-component";

const Navbar = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const { menuSidebar } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = () => setMenuOpen(!menuOpen);

  const handleToggle = () => {
    dispatch(setToggle({ menuSidebar: !menuSidebar }));
    document.body.classList.toggle("sb-sidenav-toggled");
  };

  let curLoc = useLocation();

  const handleLogout = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/api/logout-admin");
      secureLocalStorage.clear();
      setTimeout(function () {
        navigate("/", { replace: true });
      }, 500);
    } catch (e) {
      if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          html: e.response.data.message,
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            secureLocalStorage.clear();
          }
        });
      } else {
        secureLocalStorage.clear();
      }
    }
  };

  // let dataCourt = [
  //   { value: "1", label: "Court A" },
  //   { value: "2", label: "Court B" },
  //   { value: "3", label: "Court C" },
  //   { value: "4", label: "Court D" },
  // ];

  let dataCondition = [
    { value: "1", label: "Booked" },
    { value: "2", label: "Availabe" },
    { value: "3", label: "On Progress" },
    { value: "4", label: "Finished" },
  ];
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];
  

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ background: "#B21830" }}>
      <div className="container-fluid">
        <div className="menu_bar_mobile" onClick={handleToggle}>
          {menuSidebar ? <XMarkIcon /> : <Bars3BottomLeftIcon />}
        </div>
        <NavLink>
          <img src={`/${logoApp}`} alt="" />
          <b className="text-white" style={{ paddingLeft: 5, fontSize: 20 }}>
            {namaApp}
          </b>
        </NavLink>

        {/* <div className="menu" onClick={toggle}>
        {menuOpen ? <XMarkIcon /> : <FunnelIcon />}
      </div> */}
        {(curLoc.pathname === "/schedule" || curLoc.pathname === "/") && (
          <div className={menuOpen ? "menu_filter active" : "menu_filter inactive"}>
            {/* <Row>
              <Col className="text-white">
                Start Date:
                <input className="form-control form-control-sm" type="date" placeholder=".form-control-sm" style={{ width: 116 }}></input>
              </Col>
              <Col>
                End Date:
                <input className="form-control form-control-sm" type="date" placeholder=".form-control-sm" style={{ width: 116 }}></input>
              </Col>
              <Col>
                Court:
                <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
              </Col>
              <Col>
                Condition:
                <FormSelect className="form-select form-select-sm" style={{ width: 116, fontSize: 15 }} options={dataCondition} />
              </Col>
            </Row> */}
          </div>
        )}
        <ul className={`menu2 m-0 align-items-center`}>
          <li className="mx-2 notification-icon-menu">
            <Notification swal={Swal} />
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <div>
                  <img src={`${dirIcon}owl.png`} alt="" /> <span className="text-white localstorge">Hi,</span> <span className="localstorge">{secureLocalStorage.getItem("username")}</span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">
                  <Link to={"/profile"} className="">
                    <img src={`${dirIcon}profile.png`} alt="" />
                    Profile
                  </Link>
                </Dropdown.Item>
                {/* <Dropdown.Item eventKey="1" href="/logout">Logout</Dropdown.Item> */}
                {/* <Dropdown.Item eventKey="1" to={'./profile'}>
                My Profile
              </Dropdown.Item> */}
                <Dropdown.Item eventKey="2" onClick={handleLogout}>
                  <img src={`${dirIcon}logout.png`} alt="" />
                  <span className="mt-2"> Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
