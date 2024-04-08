import "./ContentWrapperStyles.scss";
import React, { useState, useContext, Navigate } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import AppointmentsList from "../../Dashboard/DashboardButtons/AppointmentsList";
import CreateAppointment from "../../Dashboard/DashboardButtons/CreateAppointment";

function ContentWrapperComponent() {
  return (
    <div className="content-wrapper-container">
      {/* ContentWrapperComponent */}
      <div className="content-wrapper-routes">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/volunteer" element={<RegisterVolunteer />} />
          <Route exact path="/olduser" element={<RegisterOldUser />} />
        </Routes>
      </div>
      <Routes>
        <Route exact path="/admindash" element={<AdminDashboard />} />
        <Route exact path="/managerdash" element={<ManagerDashboard />} />
        <Route exact path="/volunteerdash" element={<VolunteerDashboard />} />
        <Route exact path="/olduserdash" element={<OldUserDashboard />} />
       
        <Route exact path="/employeelist" element={<EmployeeList />} />
        <Route exact path="/olduserlist" element={<OldUserList />} />
        <Route exact path="/profile" element={<ProfileEdit />} />
        <Route exact path="/volunteerlist" element={<VolunteerList />} />
        <Route exact path="/appointmentslist" element={<AppointmentsList />} />
        <Route exact path="/createappointment" element={<CreateAppointment />} />
        {/* <Route exact path="volunteerlist/useredit/:id" element={<UserEditComponent />} /> */}
      </Routes>
    </div>
  );
}

export default ContentWrapperComponent;
