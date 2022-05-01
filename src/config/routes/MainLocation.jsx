import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomeLocation from "../../pages/LocCoordinatorApp";
import ContentsLocation from "../../layout/coordinator/locCoordinator/ContentsLoc";
import RequestList from "../../components/module-request/locCoordinator/CareerList";
import Request from "../../components/module-request/global/GeneralRequest";

const MainLocation = () => {
  return (
    <>
      <Routes>
        {/**===========================================Nuevo============================================== */}
        <Route path="/location" element={<HomeLocation />}>
          <Route path="home" element={<ContentsLocation />} />
        </Route>

        <Route path="/location" element={<HomeLocation />}>
          <Route path="request" element={<RequestList />} />
        </Route>

        <Route path="/location" element={<HomeLocation />}>
          <Route path="view" element={<Request />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainLocation;
