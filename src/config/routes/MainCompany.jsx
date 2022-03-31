import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestList from "../../components/module-request/company/RequestList";
import Home from "../../components/module-request/company/HomeRequest";
import Coordinator_register from "../../components/module-request/coordinator/register/coordinatorRegister"
import StepperRegistration from "../../components/module-request/company/registration/AccordionRegistration";
import SignUp from "../../components/module-request/coordinator/register/SignUp";
const MainCompany = () => {
  return (
    <>
      <Router>
        <Routes>
          //Request route
          <Route path="/company" element={<Home name ="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI"/>}>
            <Route path="request" element={<RequestList />} />
          </Route>
          <Route path="/coordinator" element={<Home name ="REGISTRO"/>}>
            <Route path="register" element={<Coordinator_register/>} />
            <Route path="singup" element={<SignUp/>}/>
          </Route>
          //Registration route
          <Route path="/company" element={<Home name ="REGISTRO"/>}>
            <Route path="register" element={<StepperRegistration/>}/>
          </Route>


        </Routes>
      </Router>
    </>
  );
};

export default MainCompany;
