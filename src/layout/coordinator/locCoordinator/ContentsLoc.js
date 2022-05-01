import React from "react";
import Careers from "../../../components/module-request/locCoordinator/CardsCareers";
import { Grid } from "@mui/material";
import Modules from "../CardsCoordinators";

const ContentsLoc = () => {
  const ListCareers = [
    {
      id: 1,
      name: "Sistema",
    },
    {
      id: 2,
      name: "Derecho",
    },
    {
      id: 3,
      name: "Telematica",
    },

    {
      id: 4,
      name: "Contabilidad",
    },
  ];

  return (
    <div>
      <Modules />
    </div>
  );
};

export default ContentsLoc;
