import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePromotion from "../../pages/PromotionApp";
import ContentPromotion from "../../layout/coordinator/proCoordinator/ContentsPro";
import Companies from "../../components/module-request/global/contacts/CompaniesList";
import RequestList from "../../components/module-request/promotion-director/request/RequestList";
import Profile from "../../components/global/profile/person/ProfilePerson";
import Company from "../../components/module-request/global/contacts/ShowCompany";
import Request from "../../components/module-request/global/GeneralRequest";

const MainPromotion = () => {
  return (
    <>
      <Routes>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="home" element={<ContentPromotion />} />
        </Route>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="companies" element={<Companies />} />
        </Route>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="request" element={<RequestList />} />
        </Route>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="company" element={<Company />} />
        </Route>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="show" element={<Request />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainPromotion;
