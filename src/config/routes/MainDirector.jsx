import React from "react";
import { Routes, Route } from "react-router-dom";

import HomeDirector from "../../pages/DirectorApp";
import ContentDirector from "../../layout/director/ContentsDir";
import Companies from "../../components/module-request/promotion-director/contacts/CompaniesList";
import RequestList from "../../components/module-request/promotion-director/request/RequestList";
import Contacts from "../../components/module-request/promotion-director/contacts/UserList";
import Profile from "../../components/global/profile/ProfilePerson";

const MainDirector = () => {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/director" element={<HomeDirector />}>
          <Route path="home" element={<ContentDirector />} />
        </Route>
        <Route path="/director" element={<HomeDirector />}>
          <Route path="companies" element={<Companies />} />
        </Route>
        <Route path="/director" element={<HomeDirector />}>
          <Route path="request" element={<RequestList />} />
        </Route>
        <Route path="/director" element={<HomeDirector />}>
          <Route path="contacts" element={<Contacts />} />
        </Route>
        <Route path="/director" element={<HomeDirector />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainDirector;
