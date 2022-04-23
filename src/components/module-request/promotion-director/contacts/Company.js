import React, { useState, useEffect } from "react";
import {
  TableCell,
  TableRow,
  IconButton,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 40;
const Company = ({ company, viewCompany }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      onClick={() => {
        viewCompany(company);
      }}
    >
      <TableCell align="left">{company.compName}</TableCell>
      <TableCell align="left">{company.compEmail}</TableCell>
      <TableCell align="center">{company.compTelephone}</TableCell>
      <TableCell align="right">{company.compAddress}</TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>

        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem key="Home" onClick={handleClose}>
            <Typography textAlign="center">Ver Compañia</Typography>
          </MenuItem>
          <MenuItem key="Perfil" onClick={handleClose}>
            <Typography textAlign="center">Ver Contactos</Typography>
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default Company;
