import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomeCompany from "../../pages/CompanyApp";
import ContentCompany from "../../layout/company/ContentsCompany";
//import UserList from "../../components/module-request/company/user/ListUser";
import UserList from "../../components/module-request/company/user/ListUser";
import RequestList from "../../components/module-request/company/request/RequestListModified";
import Create from "../../components/module-request/company/request/RequestCreate";
import Update from "../../components/module-request/company/request/RequestUpdate";

import Profile from "../../components/global/profile/ProfileCompany";
import UpdateUser from "../../components/module-request/company/user/UpdateUser";
import CreateUser from "../../components/module-request/company/user/CreateUser";
import Show from "../../components/module-request/global/CompanyRequest";

const MainCompany = () => {
  const [requestEdit, setRequestEdit] = useState({});

  return (
    <>
      <Routes>
        <Route path="/company" element={<HomeCompany />}>
          <Route path="home" element={<ContentCompany />} />
        </Route>

        <Route path="/company" element={<HomeCompany />}>
          <Route path="request" element={<RequestList />} />
        </Route>

        {/** ====================================Actions====================================== */}

        <Route path="/company" element={<HomeCompany />}>
          <Route path="create" element={<Create />} />
        </Route>

        <Route path="/company" element={<HomeCompany />}>
          <Route path="update" element={<Update request={requestEdit} />} />
        </Route>

        <Route path="/company" element={<HomeCompany />}>
          <Route path="show" element={<Show />} />
        </Route>

        {/** ====================================Contacts===================================== */}

        <Route path="/company" element={<HomeCompany />}>
          <Route path="users" element={<UserList />} />
        </Route>

        <Route path="/company" element={<HomeCompany />}>
          <Route path="updateUser" element={<UpdateUser />} />
        </Route>

        <Route path="/company" element={<HomeCompany />}>
          <Route path="createUser" element={<CreateUser />} />
        </Route>

        {/** ====================================Profile==================================== */}

        <Route path="/company" element={<HomeCompany />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainCompany;
