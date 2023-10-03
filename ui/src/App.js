import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Public from "./Components/Public";
import NotFound from "./Pages/NotFound";
import RequireAuth from "./Components/RequireAuth";
import Login from "./Pages/Auth/login";
import Logout from "./Pages/Auth/logout";
import Dashboard from "./Pages/Users/Dashboard/dashboard";
import Schedule from "./Pages/Users/Schedule/schedule";
import HistoryBooking from "./Pages/Users/historyBooking";
import Court from "./Pages/Users/DataMaster/Court/court";
import CourtForm from "./Pages/Users/DataMaster/Court/form";
import CustomerRegular from "./Pages/Users/DataMaster/Customer/customerRegular";
import CustomerMember from "./Pages/Users/DataMaster/Customer/customerMember";
import UserList from "./Pages/Users/UserManagement/UserList/userList";
import UserListForm from "./Pages/Users/UserManagement/UserList/form";
import UserRole from "./Pages/Users/UserManagement/UserRole/userRole";
import UserRoleForm from "./Pages/Users/UserManagement/UserRole/form";
import CreateBookingForm from "./Pages/Users/CreateBooking/form";
import LandingPage from "./Pages/LandingPages/landingPage";
import FormStep from "./Pages/LandingPages/Step/Step";
import Step2 from "./Pages/LandingPages/Step/Step2";
import Landing2 from "./Pages/LandingPages/Landing2";
import Setting from "./Pages/Users/setting";
import Rush from "./Pages/Users/DataMaster/Rush Hour/rush";
import LoginCustomer from "./Pages/LandingPages/Step/LoginC";
import Regular from "./Pages/Users/DataMaster/Customer/Regular";
import Member from "./Pages/Users/DataMaster/Customer/Member";
import LandingBookUser from "./Pages/LandingPages/Booking/LandingBooking";
import Scanner from "./Pages/Users/ScannerQr/Scanner";
import PeakTime from "./Pages/Users/DataMaster/Rush Hour/PeakTime";
import Profile from "./Pages/Users/Profile/profile";
import FormProfile from "./Pages/Users/Profile/form";
import Kalendar from "./Pages/Users/DataMaster/Holidays/calendar";
import Verification from "./Pages/Verifikasi/verifikasi";


export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Auth */}
          <Route index element={<Public />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/userstep" element={<FormStep />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/loginc" element={<LoginCustomer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* Protected */}
          <Route path="/" element={<RequireAuth role="user" />}>
            <Route path="/dashboard-user" element={<Landing2 />} />
            <Route path="/landingbookuser" element={<LandingBookUser />} />
          </Route>
          <Route path="/" element={<RequireAuth role="admin" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-booking" element={<CreateBookingForm />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/verification" element={<Verification/>} />
            <Route path="/history-booking" element={<HistoryBooking />} />
            <Route path="/data-master/court" element={<Court />} />
            <Route path="/data-master/court/add" element={<CourtForm />} />
            <Route path="/data-master/court/edit/:id" element={<CourtForm />} />
            <Route path="/data-master/regular" element={<Regular />} />
            <Route path="/data-master/customer-regular/add" element={<CustomerRegular />} />
            <Route path="/data-master/customer-regular/edit/:id" element={<CustomerRegular />} />
            <Route path="/data-master/member" element={<Member />} />
            <Route path="/data-master/customer-member/add" element={<CustomerMember />} />
            <Route path="/data-master/customer-member/edit/:id" element={<CustomerMember />} />
            <Route path="/data-master/calendar" element={<Kalendar />} />
            <Route path="/data-master/peaktime" element={<PeakTime />} />
            <Route path="/data-master/rush/add" element={<Rush />} />
            <Route path="/data-master/rush/edit/:id" element={<Rush />} />
            <Route path="/user-management/user-list" element={<UserList />} />
            <Route path="/user-management/user-list/add" element={<UserListForm />} />
            <Route path="/user-management/user-list/edit/:id" element={<UserListForm />} />
            <Route path="/user-management/user-role" element={<UserRole />} />
            <Route path="/user-management/user-role/add" element={<UserRoleForm />} />
            <Route path="/user-management/user-role/edit/:id" element={<UserRoleForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/formprofile/add" element={<FormProfile />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}
