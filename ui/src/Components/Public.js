import React from "react";
import Dashboard from "../Pages/Users/Dashboard/dashboard";
import LandingPage from "../Pages/LandingPages/landingPage";
import Landing2 from "../Pages/LandingPages/Landing2";
import PermissionDenied from "../Pages/PermissionDenied";

const Public = () => {
  const token = localStorage.getItem("token");
  const isRole = localStorage.getItem("role");
  return token ? isRole === "admin" ? <Dashboard /> : isRole === "user" ? <Landing2 /> : <PermissionDenied /> : <LandingPage />;
};
export default Public;
