import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePromotion from "../../pages/PromotionApp";
import ContentPromotion from "../../layout/coordinator/proCoordinator/ContentsPro";
import Companies from "../../components/module-request/global/contacts/CompaniesList";
import RequestList from "../../components/module-request/promotion-director/request/RequestList";
import Profile from "../../components/global/profile/person/ProfilePerson";
import Company from "../../components/module-request/global/contacts/ShowCompany";
import Request from "../../components/module-request/global/GeneralRequest";
import Contacts from "../../components/module-request/global/contacts/UserList";
import Report from "../../components/module-request/global/report/reportPromotion/ReportPromotion";
import Notifications from "../../components/global/notifications/notificationPromotion/NotificationContents";
import MessageStart from "../../components/global/notifications/notificationPromotion/notificationsMsg/MessageStart";
import MessageEnd from "../../components/global/notifications/notificationPromotion/notificationsMsg/MessageEnd";
import MessageByOne from "../../components/global/notifications/notificationPromotion/notificationsMsg/MessageByOne";
import MessageMany from "../../components/global/notifications/notificationPromotion/notificationsMsg/MessageByMany";

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
          <Route path="companies/company/info" element={<Company />} />
        </Route>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="companies/company/contacts" element={<Contacts />} />
        </Route>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="internrequest/show" element={<Request />} />
        </Route>

        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="report" element={<Report />} />
        </Route>

        {/**===========================================ALERTS============================================== */}
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="messagest" element={<MessageStart />} />
        </Route>

        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="messageend" element={<MessageEnd />} />
        </Route>

        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="messagemany" element={<MessageMany />} />
        </Route>

        <Route path="/promotion" element={<HomePromotion />}>
          <Route path="messageone" element={<MessageByOne />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainPromotion;
