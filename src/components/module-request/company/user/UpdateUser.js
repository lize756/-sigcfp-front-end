import React, { useState } from "react";
import { Stack, TextField, Box, Button } from "@mui/material";

const UpdateUser = () => {
  const [user, setUser] = useState({
    contName: "Oscar Ivan Riascos",
    contEmail: "oscar1@gmail.com",
    contPhone: "12385757686",
    contPosition: "jdjdijdijdj",
  });

  const update = () => {};
  return (
    <div>
      <form onSubmit={update()}>
        <Box ml={5} mr={5}>
          <Stack direction="row" spacing={3} mt={3}>
            <TextField
              sx={{ width: "50%" }}
              name="contName"
              label="Nombre"
              value={user.contName}
              variant="outlined"
            />
            <TextField
              sx={{ width: "50%" }}
              name="contEmail"
              label="Correo electrónico"
              type="email"
              value={user.contEmail}
              variant="outlined"
            />
          </Stack>
          <Stack direction="row" spacing={3} mt={3} mb={3}>
            <TextField
              sx={{ width: "50%" }}
              name="contPhone"
              label="Teléfono"
              value={user.contPhone}
              variant="outlined"
            />
            <TextField
              sx={{ width: "50%" }}
              name="contPosition"
              label="Posición"
              value={user.contPosition}
              variant="outlined"
            />
          </Stack>
          <Button color="primary" variant="contained" mt={3} type="submit">
            Guardar
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default UpdateUser;
