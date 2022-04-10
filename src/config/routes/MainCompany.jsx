import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestList from "../../components/module-request/company/RequestList";
import Home from "../../components/module-request/company/HomeRequest";
import Create from "../../components/module-request/company/RequestCreate";
import Update from "../../components/module-request/company/RequestUpdate";
import RequestView from "../../components/module-request/company/RequestView";

import Coordinator_register from "../../components/module-request/coordinator/register/CoordinatorRegister"
//import Coordinator_register from "../../components/module-request/coordinator/register/coordinatorRegister"
import StepperRegistration from "../../components/module-request/company/registration/AccordionRegistration";
import CoordBasicRegister from "../../components/module-request/coordinator/register/CoordBasicRegister";
import CoordUserRegister from "../../components/module-request/coordinator/register/CoordUserRegister";
const MainCompany = () => {
  const [requestEdit, setRequestEdit] = useState({});

  const edit = (request) => {
    setRequestEdit(request);
  };

  return (
    <>
      <Router>
        <Routes>
         {/*Request route*/} 
          <Route
            path="/company"
            element={
              <Home name="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI" />
            }
          >
            <Route path="request" element={<RequestList edit={edit} />} />
          </Route>

          <Route
            path="/company"
            element={
              <Home name="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI" />
            }
          >
            <Route path="create" element={<Create />} />
          </Route>

          <Route
            path="/company"
            element={
              <Home name="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI" />
            }
          >
            <Route path="update" element={<Update request={requestEdit} />} />
          </Route>

          <Route
            path="/company"
            element={
              <Home name="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI" />
            }
          >
            <Route
              path="view"
              element={<RequestView request={requestEdit} edit={edit} />}
            />
            <Route path="request" element={<RequestList />} />
          </Route>
          <Route path="/coordinator" element={<Home name="REGISTRO" />}>
            <Route path="register" element={<CoordBasicRegister />} />
            <Route path="register/user_register" element={<CoordUserRegister />} />
          </Route>
          {/*Registration route*/}
          <Route path="/company" element={<Home name="REGISTRO" />}>
            <Route path="register" element={<StepperRegistration />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default MainCompany;
