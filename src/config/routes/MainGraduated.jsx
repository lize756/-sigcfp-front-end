import React from "react";
import { Routes, Route } from "react-router-dom";
import GraduatedApp from "../../pages/GraduatedApp";
import ContentsGraduated from "../../layout/graduated/ContentsGraduated";
import Curriculum from "../../components/module-graduated/graduated/CurriculumGR";

const MainGraduated = () => {
  return (
    <>
      <Routes>
        <Route path="/graduated" element={<GraduatedApp />}>
          <Route path="home" element={<ContentsGraduated />} />
        </Route>

        <Route path="/graduated" element={<GraduatedApp />}>
          <Route path="curriculum" element={<Curriculum />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainGraduated;
