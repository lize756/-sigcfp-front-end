import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePromotion from "../../pages/PromotionApp";
import ContentPromotion from "../../layout/coordinator/proCoordinator/ContentsPro";
import Companies from "../../components/module-request/promotion-director/contacts/CompaniesList";
import RequestList from "../../components/module-request/promotion-director/request/RequestList";

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
      </Routes>
    </>
  );
};

export default MainPromotion;
