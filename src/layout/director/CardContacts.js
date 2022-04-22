import React, { useEffect, useState } from "react";
import { Card, Typography, CardHeader, CardContent } from "@mui/material";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@mui/lab";

/**=========================================Componentes======================================= */
import axios from "../../config/axios";

const ContactItems = ({ index, item, isLast }) => {
  const { contEmail, contName } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (index === "1" && "primary") ||
            (index === "2" && "success") ||
            (index === "3" && "info") ||
            (index === "4" && "warning") ||
            "error"
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{contName}</Typography>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {contEmail}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

const CardContacts = () => {
  const [contactList, setContactList] = useState();

  useEffect(() => {
    axios.get("/contacts/").then((res) => setContactList(res.data.slice(0, 5)));
  }, []);
  const title = " Nuevos Contactos ";
  return (
    <div>
      <Card sx={{ borderRadius: 5 }}>
        <CardHeader title={title} />

        <CardContent
          sx={{
            "& .MuiTimelineItem-missingOppositeContent:before": {
              display: "none",
            },
          }}
        >
          <Timeline>
            {contactList?contactList.map((item, index) => (
              <ContactItems
                key={item.contId}
                item={item}
                index={index}
                isLast={index === contactList.length - 1}
              />
            )):""}
          </Timeline>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardContacts;
