import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { namaApp, logoApp, dirIcon } from "./Services/config";
import { Row, Col } from "react-bootstrap";
import { FunnelIcon, XMarkIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../Reducers/menuSlice";
import FormSelect from "./Form/select";
import axios from "../api/axios";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import Notifications from "react-notifications-menu";

const Navbar = () => {
  const DEFAULT_NOTIFICATION = {
    image: "https://synergi-dev.s3.ap-southeast-1.amazonaws.com/profile-pictures/6b9.png",
    message: "Notification one.",
    detailPage: "/events",
    receivedTime: "12h ago",
  };

  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [message, setMessage] = useState("");

  const [bell, setBell] = useState("../assets/icon/notif.png");

  const onClicknotif = () => {
    if (message.length > 0) {
      setData([
        ...data,
        {
          ...DEFAULT_NOTIFICATION,
          message,
        },
      ]);
      setMessage("");
      alert("notification added");
    }
  };
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
      await axios.post("/api/logout-admin", null, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
        },
      });
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

  let dataCourt = [
    { value: "1", label: "Court A" },
    { value: "2", label: "Court B" },
    { value: "3", label: "Court C" },
    { value: "4", label: "Court D" },
  ];

  let dataCondition = [
    { value: "1", label: "Booked" },
    { value: "2", label: "Availabe" },
    { value: "3", label: "On Progress" },
    { value: "4", label: "Finished" },
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
        {(curLoc.pathname === "/dashboard" || curLoc.pathname === "/") && (
          <div className={menuOpen ? "menu_filter active" : "menu_filter inactive"}>
            <ul className={`filter text-white m-0${menuOpen ? " open" : ""}`}>
              <li key="filter0">
                <Row>
                  <Col>
                    Start Date:
                    <input className="form-control form-control-sm" type="date" placeholder=".form-control-sm" style={{ width: 116 }}></input>
                  </Col>
                  <Col>
                    End Date:
                    <input className="form-control form-control-sm" type="date" placeholder=".form-control-sm" style={{ width: 116 }}></input>
                  </Col>
                </Row>
              </li>
              <li key="filter1">
                Court:
                <FormSelect className="form-select form-select-sm" style={{ width: 116, fontSize: 15 }} options={dataCourt} />
              </li>
              <li key="filter2">
                Condition:
                <FormSelect className="form-select form-select-sm" style={{ width: 116, fontSize: 15 }} options={dataCondition} />
              </li>
            </ul>
          </div>
        )}
        <ul className={`menu2 m-0`}>
          <li className="mx-2">
            <NavLink to="/" className="">
              <Notifications
                data={data}
                header={{
                  title: "Notifications",
                  option: { text: "View All", onClicknotif: () => console.log("Clicked") },
                }}
                markAsRead={(data) => {
                  console.log(data);
                }}
                icon={bell}
              />
            </NavLink>
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
