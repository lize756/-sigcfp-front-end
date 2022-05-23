import React from "react";
import { Routes, Route } from "react-router-dom";
import TalentsA1App from "../../pages/TalentsA1App";
import ContentsTalents from "../../layout/talentsA1/ContentsTalents";

const MainTalentsA1 = () => {
  return (
    <>
      <Routes>
        <Route path="/talents" element={<TalentsA1App />}>
          <Route path="home" element={<ContentsTalents />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainTalentsA1;
