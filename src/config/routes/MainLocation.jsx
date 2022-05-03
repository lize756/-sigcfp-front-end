import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomeLocation from "../../pages/LocCoordinatorApp";
import ContentsLocation from "../../layout/coordinator/locCoordinator/ContentsLoc";
import CareerList from "../../components/module-request/locCoordinator/CareerList";
import Request from "../../components/module-request/global/GeneralRequest";
import Profile from "../../components/global/profile/person/ProfilePerson";

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
          <Route path="view" element={<Request />} />
        </Route>

        <Route path="/location" element={<HomeLocation />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainLocation;
