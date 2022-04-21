import React, { useEffect } from "react";
import Modules from "./CardsModule";
import TableHome from "./TableContact";
import { Container, Grid } from "@mui/material";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
  fetchtInternsRequests,
  fetchCompany,
  fetchCareers,
} from "../../components/store/slices/company/CompanySlice";

/**
 * Main Class of Company
 * @returns
 */
const ContentsCompany = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();

  //Redux
  // Get company id of the store
  const userCompanyId = useSelector((state) => state.userLogin.userCompanyId);
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  //Axios
  useEffect(() => {
    // Added to store the company that user login
    dispatch(fetchCompany(ACCESS_TOKEN, userCompanyId));
    // Added to store the list of intern requests that company have associated.
    dispatch(fetchtInternsRequests(ACCESS_TOKEN, userCompanyId));
    //Added to store of list of carreers.
    dispatch(fetchCareers(ACCESS_TOKEN));
  }, []);

  return (
    <div>
      {" "}
      <Modules />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableHome />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContentsCompany;
