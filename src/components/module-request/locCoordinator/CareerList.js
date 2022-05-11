import React from "react";
import Careers from "./CardsCareers";
import { Grid } from "@mui/material";
//redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
const CareerList = () => {
  /**
   * ----------------------------------------
   * ---------------- REDUX -----------------
   * ----------------------------------------
   */
  const dispatch = useDispatch();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  // Correspond the person save in the store
  const ListCareers = useSelector((state) => state.PersonSlice.person.careers);
  //navigate
  let navigate = useNavigate();

  return (
    <div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {ListCareers
            ? ListCareers.map((career, index) => {
                return (
                  <Grid item xs={3}>
                    <Careers key={career.careId} career={career} index={index} />
                  </Grid>
                );
              })
            : ""}
        </Grid>
    </div>
  );
};

export default CareerList;
