import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonalInfoGR from "./PersonalInfoGR";
import JobProfileGR from "./JobProfileGR";
import AcademicTrainingGR from "./AcademicTrainingGR";
import LanguagesGR from "./LanguagesGR";

import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const CurriculumGR = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Información personal</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PersonalInfoGR />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Perfil laboral</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <JobProfileGR />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Formación académica</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <AcademicTrainingGR />
          <Divider>IDIOMAS</Divider>
          <LanguagesGR />
        </AccordionDetails>
      </Accordion>

      <Stack mt={5} alignItems="center">
        <label htmlFor="contained-button-file">
          <Input
            accept="pdf/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button variant="contained" component="span">
            Subir Hoja de Vida
          </Button>
        </label>
      </Stack>
    </div>
  );
};

export default CurriculumGR;
