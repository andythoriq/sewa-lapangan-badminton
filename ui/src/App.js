import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './Components/Layout'
import Public from './Components/Public'
import NotFound from './Pages/NotFound';
import RequireAuth from './Components/RequireAuth'
import Login from './Pages/Auth/login'
import Logout from './Pages/Auth/logout'
import Dashboard from './Pages/Users/Dashboard/dashboard'
import Schedule from './Pages/Users/Schedule/schedule';
import HistoryBooking from './Pages/Users/historyBooking';
import Court from './Pages/Users/DataMaster/Court/court';
import CourtForm from './Pages/Users/DataMaster/Court/form';
import CustomerRegular from './Pages/Users/DataMaster/customerRegular';
import CustomerMember from './Pages/Users/DataMaster/customerMember';
import Holidays from './Pages/Users/DataMaster/Holidays/holidays';
import UserList from './Pages/Users/UserManagement/UserList/userList';
import UserListForm from './Pages/Users/UserManagement/UserList/form';
import UserRole from './Pages/Users/UserManagement/UserRole/userRole';
import UserRoleForm from './Pages/Users/UserManagement/UserRole/form';
import CreateBookingForm from './Pages/Users/CreateBooking/form';
import LandingPage from './Pages/LandingPages/landingPage';
import FormStep from './Pages/LandingPages/Step/Step';
import Step2 from './Pages/LandingPages/Step/Step2';
import Landing2 from './Pages/LandingPages/Landing2';
import RushHour from './Pages/Users/Rush Hour/rushhour';
import Setting from './Pages/Users/DataMaster/setting';

export default class App extends Component {
  render () {
    return (
          <Routes>
            <Route path="/" element={<Layout/>}>
              {/* Public Auth */}
                <Route index element={<Public/>}/>
                <Route path="/landing-page" element={<LandingPage/>}/>
                <Route path="/userstep" element={<FormStep/>}/>
                <Route path="/step2" element={<Step2/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
              {/* Protected */}
              <Route path="/" element={<RequireAuth role="user"/>}>
                <Route path="/dashboard-user" element={<Landing2/>}/>
              </Route>
              <Route path="/" element={<RequireAuth role="admin"/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/create-booking" element={<CreateBookingForm/>}/>
                <Route path="/schedule" element={<Schedule/>}/>
                <Route path="/history-booking" element={<HistoryBooking/>}/>
                <Route path="/data-master/court" element={<Court/>}/>
                <Route path="/data-master/court/add" element={<CourtForm/>}/>
                <Route path="/data-master/court/edit/:id" element={<CourtForm/>}/>
                <Route path="/data-master/customer-regular" element={<CustomerRegular/>}/>
                <Route path="/data-master/customer-member" element={<CustomerMember/>}/>
                <Route path="/data-master/holidays" element={<Holidays/>}/>
                <Route path="/data-master/rushhour" element={<RushHour/>}/>
                <Route path="/user-management/user-list" element={<UserList/>}/>
                <Route path="/user-management/user-list/add" element={<UserListForm/>}/>
                <Route path="/user-management/user-list/edit/:id" element={<UserListForm/>}/>
                <Route path="/user-management/user-role" element={<UserRole/>}/>
                <Route path="/user-management/user-role/add" element={<UserRoleForm/>}/>
                <Route path="/user-management/user-role/edit/:id" element={<UserRoleForm/>}/>
                <Route path='/setting' element={<Setting/>}/>
              </Route>
              <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes>
    );  
  }
}