import React from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../StylesCompany.css";

const RequestSearch = () => {
  return (
    <div className="search-component">
      <TextField
        size="small"
        sx={{ width: "50%", mt: 5, ml: 5 }}
        placeholder="Buscar"
      />{" "}
      &nbsp; &nbsp;
      <IconButton
        type="submit"
        aria-label="search"
        color="primary"
        sx={{ mt: 5 }}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default RequestSearch;
