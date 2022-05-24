import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonalInfoGR from "./PersonalInfoGR";
import JobProfileGR from "./JobProfileGR";
import AcademicTrainingGR from "./AcademicTrainingGR";

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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CurriculumGR;
