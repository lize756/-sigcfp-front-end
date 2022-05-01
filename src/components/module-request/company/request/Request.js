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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router";

const ITEM_HEIGHT = 40;
const Request = ({ request, delRequest, editRequest, viewRequest }) => {
  //lista de solicitudes de practica
  let navigate = useNavigate();
  const [getStrCareers, setStrCareers] = useState("");
  const [getStrFaculty, setStrFaculty] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Allow concat the elements in the list of careers with its faculty

    let concatCareers = "";
    let concatFaculty = "";
    const array = request.careers;
    for (let i = 0; i < array.length; i++) {
      if (i === array.length - 1) {
        concatCareers += array[i].careName;
        concatFaculty += array[i].faculty.facuName;
      } else {
        concatCareers += array[i].careName + ",";
        concatFaculty += array[i].faculty.facuName + ",";
      }
    }
    setStrCareers(concatCareers);
    setStrFaculty(concatFaculty);
  }, []);

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={request.inteRequId}>
      <TableCell
        align="left"
        onClick={() => {
          navigate("/company/show");
        }}
      >
        {request.inteRequName}
      </TableCell>
      <TableCell
        align="center"
        onClick={() => {
          navigate("/company/show");
        }}
      >
        {getStrFaculty}
      </TableCell>
      <TableCell
        align="center"
        onClick={() => {
          navigate("/company/show");
        }}
      >
        {getStrCareers}
      </TableCell>
      <TableCell
        align="center"
        onClick={() => {
          navigate("/company/show");
        }}
      >
        {request.inteRequStDate}
      </TableCell>
      <TableCell
        align="right"
        onClick={() => {
          navigate("/company/show");
        }}
      >
        {request.inteRequNumber}
      </TableCell>
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
          <MenuItem
            key="edit"
            onClick={() => {
              editRequest(request);
            }}
          >
            <Typography textAlign="center">Editar solicitud</Typography>
          </MenuItem>
          <MenuItem
            key="delete"
            onClick={() => {
              delRequest(request);
            }}
          >
            <Typography textAlign="center">Eliminar solicitud</Typography>
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default Request;
