import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Card,
} from "@mui/material";
import { pink } from "@mui/material/colors";
/**
 * REDUX
 */
import { useSelector, useDispatch } from "react-redux";
import { downloadCompanyInternRequestsReport } from "../../../store/slices/ReportSlice";

const ReportByCompany = () => {

  // This line allow dispatch a one element to store
  const dispatch = useDispatch();
  // Obtain all companies saved in the database
  const companies = useSelector((state) => state.CompanySlice.listCompanies);

  const [getCompany, setCompany] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    const report = {
      compId: getCompany.id,
      type: "PDF",
    };
    //console.log(getCompany);
    dispatch(downloadCompanyInternRequestsReport(getCompany.compId))
  };

  return (
    <div>
      <Grid
        container
        spacing={5}
        p={4}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs="auto">
          <Card
            sx={{
              width: 770,
              height: 200,
              py: 5,
              boxShadow: 2,
              bgcolor: pink[50],
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ opacity: 1, color: "#ab003c", textAlign: "center" }}
            >
              SOLICITUDES DE UNA EMPRESA
            </Typography>
            <form onSubmit={onSubmit}>
              <Grid
                container
                spacing={5}
                p={4}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item xs="auto">
                  <Autocomplete
                    sx={{ width: 400 }}
                    freeSolo
                    disableClearable
                    id="free-solo-2-demo"
                    options={companies}
                    getOptionLabel={(option) => option.compName}
                    onChange={(event, value) => setCompany(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Seleccione una empresa"
                        required
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs="auto">
                  <Button type="submit" variant="contained">
                    GENERAR REPORTE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportByCompany;
