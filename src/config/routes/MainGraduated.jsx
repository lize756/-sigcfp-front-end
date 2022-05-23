import React from "react";
import { Routes, Route } from "react-router-dom";
import GraduatedApp from "../../pages/GraduatedApp";
import ContentsGraduated from "../../layout/graduated/ContentsGraduated";

const MainGraduated = () => {
  return (
    <>
      <Routes>
        <Route path="/graduated" element={<GraduatedApp />}>
          <Route path="home" element={<ContentsGraduated />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainGraduated;
