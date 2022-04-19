import React, { useEffect, useState } from "react";

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

const ContactItems = ({ contact }) => {
  const { contName, contEmail, contPosition } = contact;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" noWrap>
          {contName}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {contEmail}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {contPosition}
      </Typography>
    </Stack>
  );
};

const TableContact = () => {
  const [contactList, setContactList] = useState();
  const title = "Nuevos Contactos";

  useEffect(() => {
    axios.get("/contacts/").then((res) => setContactList(res.data.slice(0, 5)));
  }, []);

  const preventDefault = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      {" "}
      <Card sx={{ borderRadius: 5 }}>
        <CardHeader title={title} sx={{ color: "primary" }} />

        <CardContent>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {contactList?.map((contact) => (
              <ContactItems key={contact.contId} contact={contact} />
            ))}
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

export default TableContact;
