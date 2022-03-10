import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestList from "../../components/module-request/company/RequestList";
import Home from "../../components/module-request/company/HomeRequest";
import StepperRegistration from "../../components/module-request/company/StepperRegistration";

const MainCompany = () => {
  return (
    <>
      <Router>
        <Routes>
          //Request route
          <Route path="/company" element={<Home name ="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI"/>}>
            <Route path="request" element={<RequestList/>}/>
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
