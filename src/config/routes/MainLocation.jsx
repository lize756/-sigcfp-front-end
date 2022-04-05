import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestLocation from "../../components/module-request/location-coordinator/RequestLocation";
import Home from "../../components/module-request/location-coordinator/HomeLocation";
import View from "../../components/module-request/location-coordinator/RequestLocView";
import ContactList from "../../components/module-request/location-coordinator/ContactList";

const MainLocation = () => {
  const [request, setRequest] = useState({});

  const requestView = (request) => {
    setRequest(request);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/location"
            element={
              <Home name="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI" />
            }
          >
            <Route
              path="request"
              element={<RequestLocation requestView={requestView} />}
            />
          </Route>

          <Route
            path="/location"
            element={
              <Home name="PORTAL DE SOLICITUDES PRACTICANTES DE LA UNIVERSIDAD ICESI" />
            }
          >
            <Route path="view" element={<View request={request} />} />
          </Route>

          <Route
            path="/location"
            element={<Home name="INFORMACIÓN DE CONTACTO DE LAS EMPRESAS" />}
          >
            <Route path="contact" element={<ContactList />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default MainLocation;
