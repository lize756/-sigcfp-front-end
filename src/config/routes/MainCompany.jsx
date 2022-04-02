import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestList from "../../components/module-request/company/RequestList";
import Home from "../../components/module-request/company/HomeRequest";
//import Coordinator_register from "../../components/module-request/coordinator/register/coordinatorRegister"
import Coordinator_register from "../../components/module-request/coordinator/register/coordinatorRegisterRedux";
import StepperRegistration from "../../components/module-request/company/registration/AccordionRegistration";
import CoordBasicRegister from "../../components/module-request/coordinator/register/CoordBasicRegister";
import CoordUserRegister from "../../components/module-request/coordinator/register/CoordUserRegister";
const MainCompany = () => {
  //

  return (
    <>
      <Router>
        <Routes>
          //Request route
          <Route
            path="/company"
            element={
              <Home name="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI" />
            }
          >
            <Route path="request" element={<RequestList />} />
          </Route>
          <Route path="/coordinator" element={<Home name="REGISTRO" />}>
            <Route path="singup" element={<Coordinator_register />} />
            <Route path="register" element={<CoordBasicRegister />} />
            <Route path="register/user_register" element={<CoordUserRegister />} />
          </Route>
          //Registration route
          <Route path="/company" element={<Home name="REGISTRO" />}>
            <Route path="register" element={<StepperRegistration />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default MainCompany;
