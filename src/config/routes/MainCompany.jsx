import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeCompany from "../../pages/CompanyApp";
import ContentCompany from "../../layout/company/ContentsCompany";
import HomeDirector from "../../pages/DirectorApp";
import ContentDirector from "../../layout/director/ContentsDir";
import UserList from "../../components/module-request/company/user/ListUser";
import RequestList from "../../components/module-request/company/request/RequestList";
import Home from "../../components/module-request/company/HomeRequest";
import Create from "../../components/module-request/company/request/RequestCreate";
import Update from "../../components/module-request/company/request/RequestUpdate";
import RequestView from "../../components/module-request/company/request/RequestView";

const MainCompany = () => {
  const [requestEdit, setRequestEdit] = useState({});
  const [UserEdit, setUserEdit] = useState({});

  const edit = (request) => {
    setRequestEdit(request);
  };

  const editUser = (user) => {
    setUserEdit(user);
  };
  return (
    <>
      <Routes>
        <Route path="/director" element={<HomeDirector />}>
          <Route path="home" element={<ContentDirector />} />
        </Route>
        <Route path="/company" element={<HomeCompany />}>
          <Route path="home" element={<ContentCompany />} />
        </Route>
        <Route path="/company" element={<HomeCompany />}>
          <Route path="request" element={<RequestList edit={edit} />} />
        </Route>
        <Route path="/company" element={<HomeCompany />}>
          <Route path="create" element={<Create />} />
        </Route>
        <Route path="/company" element={<HomeCompany />}>
          <Route path="update" element={<Update request={requestEdit} />} />
        </Route>
        <Route path="/company" element={<HomeCompany />}>
          <Route
            path="view"
            element={<RequestView request={requestEdit} edit={edit} />}
          />
        </Route>
        {/** ====================================Contacts=============================== */}

        <Route path="/company" element={<HomeCompany />}>
          <Route path="users" element={<UserList userEdit={editUser} />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainCompany;
