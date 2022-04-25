import React, { useEffect } from "react";
import Modules from "../company/CardsModule";
import TableHome from "./TableCompanies";
import CardContact from "./CardContacts";
import { Container, Grid } from "@mui/material";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { getperson } from "../../components/store/slices/PersonSlice";
import { getCompanies } from "../../components/store/slices/CompanySlice";
import { getInternRequests } from "../../components/store/slices/InternRequestSlice";
import { getContactsAssociatedCompany } from "../../components/store/slices/ContactSlice";
const ContentsCompany = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();

  //Redux
  // Get person id of the store
  const userPersonId = useSelector((state) => state.userLogin.userPersonId);
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  useEffect(() => {
    //Adde to store the person that user login
    dispatch(getperson(ACCESS_TOKEN, userPersonId));
    // Added to store of list of companies
    dispatch(getCompanies(ACCESS_TOKEN));
    // Added to store of list of intern requests inside in database
    dispatch(getInternRequests(ACCESS_TOKEN))

  }, []);

  return (
    <div>
      {" "}
      <Modules />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <TableHome />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CardContact />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default ContentsCompany;
