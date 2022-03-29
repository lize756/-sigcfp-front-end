import React from "react";
import { TextField, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../StylesCompany.css";

const RequestSearch = () => {
  return (
    <div className="search-component">
      <TextField size="small" sx={{ width: "50%" }} placeholder="Buscar" />{" "}
      &nbsp; &nbsp;
      <IconButton type="submit" aria-label="search" color="primary">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default RequestSearch;
