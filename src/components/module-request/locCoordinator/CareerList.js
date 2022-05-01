import React from "react";
import Careers from "./CardsCareers";
import { Grid } from "@mui/material";

const CareerList = () => {
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
      <Grid container mt={2} mx={0.5}>
        {ListCareers
          ? ListCareers.map((career, index) => {
              return (
                <Grid item xs={3}>
                  <Careers key={career.id} career={career} index={index} />
                </Grid>
              );
            })
          : ""}
      </Grid>
    </div>
  );
};

export default CareerList;
