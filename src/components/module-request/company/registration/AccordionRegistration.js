import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../StylesCompany.css";
import RegistrationBasicCompanyData from "./RegistrationBasicCompanyData";
import RegistrationContactCompany from "./RegistrationContactCompany";

//Component
const AccordionRegistration = () => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="accordion-padding">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {/*Plane 1:*/}
          <Typography sx={{ flexShrink: 0 }}>
            DATOS GENERALES DE LA ORGANIZACIÓN 
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*Plane 1: Form for registration of basic company data*/}
          <RegistrationBasicCompanyData isRendered = {true} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        {/*DATOS DE CONTACTO*/}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>DATOS DE CONTACTO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*Plane 1: Form for registration the contact of the company*/}
          <RegistrationContactCompany />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionRegistration;
