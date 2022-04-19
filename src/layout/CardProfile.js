import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";

//in need send the name, props?
const CardProfile = () => {
  const name = "Jaydon Frankie";
  const letterFirst = "J";

  return (
    <div>
      {" "}
      <Card sx={{ bgcolor: blue[50], borderRadius: 5, width: 230, height: 70 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#072079" }} aria-label="recipe">
              {letterFirst}
            </Avatar>
          }
          title={name}
        />
      </Card>
    </div>
  );
};

export default CardProfile;
