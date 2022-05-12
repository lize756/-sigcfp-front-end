import React from "react";
import { Routes, Route } from "react-router-dom";
import Company from "../../components/module-request/global/contacts/ShowCompany";
import HomeLocation from "../../pages/LocCoordinatorApp";
import ContentsLocation from "../../layout/coordinator/locCoordinator/ContentsLoc";
import CareerList from "../../components/module-request/locCoordinator/CareerList";
import Request from "../../components/module-request/global/GeneralRequest";
import Profile from "../../components/global/profile/person/ProfilePerson";
import Contacts from "../../components/module-request/global/contacts/UserList";
import Companies from "../../components/module-request/global/contacts/CompaniesList";
import RequestListByCareer from "../../components/module-request/locCoordinator/inRequestByCareer/RequestListByCareer";

const MainLocation = () => {
  return (
    <>
      <Routes>
        {/**===========================================Nuevo============================================== */}
        <Route path="/location" element={<HomeLocation />}>
          <Route path="home" element={<ContentsLocation />} />
        </Route>

        <Route path="/location" element={<HomeLocation />}>
          <Route path="careers" element={<CareerList />} />
        </Route>
        <Route path="/location" element={<HomeLocation />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/location" element={<HomeLocation />}>
          <Route path="companies" element={<Companies />} />
        </Route>
        <Route path="/location" element={<HomeLocation />}>
          <Route path="requests" element={<RequestListByCareer />} />
        </Route>
        <Route path="/location" element={<HomeLocation />}>
          <Route path="companies/company/info" element={<Company />} />
        </Route>
        <Route path="/location" element={<HomeLocation />}>
          <Route path="companies/company/contacts" element={<Contacts />} />
        </Route>
        <Route path="/location" element={<HomeLocation />}>
          <Route path="internrequest/show" element={<Request />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainLocation;
