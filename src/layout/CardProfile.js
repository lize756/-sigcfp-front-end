import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
//in need send the name, props?
const CardProfile = () => {
  const compName = useSelector((state) => state.CompanySlice.company.compName);
  const personName = useSelector((state) => state.PersonSlice.person.persName);

  // Correspond to rol login in the system
  const rolUserLogin = useSelector((state) => state.userLogin.rolee);

  const [getName, setName] = useState();
  const [getLetterFirst, setLetterFirst] = useState();

  useEffect(() => {
      const name = "";
      const letterFirst = "";
      setName(name);
      setLetterFirst(letterFirst);
  }, [rolUserLogin]);

  return (
    <div>
      {" "}
      <Card sx={{ bgcolor: blue[50], borderRadius: 5, width: 230, height: 70 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#072079" }} aria-label="recipe">
              {getLetterFirst}
            </Avatar>
          }
          title={getName}
        />
      </Card>
    </div>
  );
};

export default CardProfile;
