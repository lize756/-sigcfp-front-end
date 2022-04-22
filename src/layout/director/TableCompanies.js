import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Card,
  Button,
  Divider,
  Link,
  Typography,
  CardHeader,
  CardContent,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/**=========================================Componentes======================================= */
import axios from "../../config/axios";

const CompanyItems = ({ company }) => {
  const { compName, compEmail, compTelephone } = company;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" noWrap>
          {compName}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {compEmail}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {compTelephone}
      </Typography>
    </Stack>
  );
};

const TableCompanies = () => {
  const [companyList, setCompanyList] = useState([]);
  const title = "Compañias Recientes";

  useEffect(() => {
    axios
      .get("/companies/")
      .then((res) => setCompanyList(res.data.slice(0, 5)));
  }, []);

  return (
    <div>
      {" "}
      <Card sx={{ borderRadius: 5 }}>
        <CardHeader title={title} />

        <CardContent>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {companyList?companyList.map((company) => (
              <CompanyItems key={company.compId} company={company} />
            )):""}
          </Stack>
        </CardContent>

        <Divider />

        <Box sx={{ p: 2, textAlign: "right" }}>
          <Button size="small" color="inherit" endIcon={<ChevronRightIcon />}>
            Ver Más
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default TableCompanies;
