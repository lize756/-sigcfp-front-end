import React, { useEffect } from "react";
import Careers from "../../../components/module-request/locCoordinator/CardsCareers";
import { Grid } from "@mui/material";
import Modules from "../CardsCoordinators";
import { useDispatch, useSelector } from "react-redux";
import { getperson } from "../../../components/store/slices/PersonSlice";
import { getCompanies } from "../../../components/store/slices/CompanySlice";
import { getInternRequests } from "../../../components/store/slices/InternRequestSlice";

const ContentsLoc = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //Redux
  // Get person id of the store
  const userPersonId = useSelector((state) => state.userLogin.userPersonId);
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  //Axios
  useEffect(() => {
    //Adde to store the person that user login
    dispatch(getperson(ACCESS_TOKEN, userPersonId));
    // Added to store of list of companies
    dispatch(getCompanies(ACCESS_TOKEN));
    // Added to store of list of intern requests inside in database
    dispatch(getInternRequests(ACCESS_TOKEN));
  }, []);

  return (
    <div>
      <Modules />
    </div>
  );
};

export default ContentsLoc;
