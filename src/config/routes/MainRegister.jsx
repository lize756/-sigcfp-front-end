/**
 * This component is responsible for controlling everything related to the registry paths
 */

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//Import routes
import Home from "../../components/module-request/company/HomeRequest";
import SignInSide from "../../components/module-request/login/SignInSide";
import DashboardCreateAccount from "../../components/module-request/login/DashboardCreateAccount";

import StepperRegistration from "../../components/module-request/company/registration/AccordionRegistration";
import CoordBasicRegister from "../../components/module-request/coordinator/register/CoordBasicRegister";
import CoordUserRegister from "../../components/module-request/coordinator/register/CoordUserRegister";
import { NoPageFound } from "./NoPageFound";

const MainRegister = () => {
  return (
    <>
      <Router>
        <Routes>
            {/*Main registration route*/}
            <Route path="/signIn" element={<SignInSide />} />

            {/*Route of select type of user to register*/}
            <Route
              path="/signIn"
              element={
                <Home name="SELECCIÓN DE USUARIO QUE SE DESEA REGISTRAR" />
              }
            >
              <Route path="typeRegister" element={<DashboardCreateAccount />} />
            </Route>

            {/*Registration route of a coordinator*/}
            <Route path="/coordinator" element={<Home name="REGISTRO" />}>
              <Route path="register" element={<CoordBasicRegister />} />
              <Route
                path="register/user_register"
                element={<CoordUserRegister />}
              />
            </Route>

            {/*Registration route of a company*/}
            <Route path="/company" element={<Home name="REGISTRO" />}>
              <Route path="register" element={<StepperRegistration />} />
            </Route>
            <Route path="*" element={<NoPageFound />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default MainRegister;
