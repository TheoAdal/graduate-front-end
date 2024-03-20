import "./ContentWrapperStyles.scss";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../HomePage/HomePageComponent";
import Contact from "../ContactUsPage/ContactUsPageComponent";
import About from "../AboutUsPage/AboutUsPageComponent";
import RegisterVolunteer from "../RegisterPages/RegisterVolunteerComponent";
import RegisterOldUser from "../RegisterPages/RegisterOldUserComponent";
import Login from "../LoginPage/LoginWrapperComponent";

import AdminDashboard from "../../Dashboard/AdminDashboard/AdminDashboard";
import ManagerDashboard from "../../Dashboard/ManagerDashboard/ManagerDashboard";
import VolunteerDashboard from "../../Dashboard/VolunteerDashboard/VolunteerDashboard";
import OldUserDashboard from "../../Dashboard/OldUserDasboard/OldUserDashboard";

import EmployeeList from "../../Dashboard/DashboardButtons/EmployeeListComponent";
import OldUserList from "../../Dashboard/DashboardButtons/OldUserListComponent";
import ProfileEdit from "../../Dashboard/DashboardButtons/ProfileEditComponent";
import VolunteerList from "../../Dashboard/DashboardButtons/VolunteerListComponent";
import UserEditComponent from "../../Dashboard/DashboardButtons/UserEditComponent";
import Calendar from "../../Dashboard/DashboardButtons/Calendar";

function ContentWrapperComponent() {
   

  return (
    <div className="content-wrapper-container">
      {/* ContentWrapperComponent */}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/volunteer" element={<RegisterVolunteer />}></Route>
        <Route exact path="/olduser" element={<RegisterOldUser />}></Route>

        <Route exact path="/admindash" element={<AdminDashboard />}></Route>
        <Route exact path="/managerdash" element={<ManagerDashboard />}></Route>
        <Route exact path="/volunteerdash" element={<VolunteerDashboard />}></Route>
        <Route exact path="/olduserdash" element={<OldUserDashboard />}></Route>

        <Route exact path="/employeelist" element={<EmployeeList />}></Route>
        <Route exact path="/olduserlist" element={<OldUserList />}></Route>
        <Route exact path="/profile" element={<ProfileEdit />}></Route>
        <Route exact path="/volunteerlist" element={<VolunteerList />}></Route>
        <Route exact path="/calendar" element={<Calendar />}></Route>
        <Route exact path="/useredit" element={<UserEditComponent />}></Route>
      </Routes>
    </div>
  );
}

export default ContentWrapperComponent;
