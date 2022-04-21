import React from "react";
import { Routes, Route } from "react-router-dom";

import HomeDirector from "../../pages/DirectorApp";
import ContentDirector from "../../layout/director/ContentsDir";
import Companies from "../../components/module-request/promotion-director/contacts/CompaniesList";
import RequestList from "../../components/module-request/promotion-director/request/RequestList";

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
      </Routes>
    </>
  );
};

export default MainDirector;
