import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import RequestLocation from "../../components/module-request/location-coordinator/RequestLocation";
import Home from "../../components/module-request/location-coordinator/HomeLocation";
import View from "../../components/module-request/location-coordinator/RequestLocView";
import ContactList from "../../components/module-request/location-coordinator/ContactList";
import CompaniesList from "../../components/module-request/location-coordinator/CompaniesList";

const MainLocation = () => {
  const [request, setRequest] = useState({});
  const [contact, setContact] = useState({});

  const requestView = (request) => {
    setRequest(request);
  };

  const listContacts = (contacts) => {
    setContact(contacts);
  };

  return (
    <>
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
            <Route
              path="contact"
              element={<ContactList contacts={contact} />}
            />
          </Route>

          <Route
            path="/location"
            element={<Home name="INFORMACIÓN DE LAS EMPRESAS" />}
          >
          <Route
              path="companies"
              element={<CompaniesList listContacts={listContacts} />}
          />
          
          </Route>
        </Routes>
    </>
  );
};

export default MainLocation;
