import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../components/module-request/company/HomeRequest";
import StepperRegistration from "../../components/module-request/company/StepperRegistration";

const MainCompany = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/company" element={<Home name ="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI"/>}></Route>
          <Route path="/register" element={<StepperRegistration/>}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default MainCompany;
