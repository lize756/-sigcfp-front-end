import React from "react";
import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import imgCareer1 from "../../../assets/img_card_careers.png";
import imgCareer2 from "../../../assets/img_card_careers_2.png";

const CardsCareers = ({ index, career }) => {
  return (
    <>
      {" "}
      <Card sx={{ maxWidth: 310 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={index % 2 === 0 ? imgCareer1 : imgCareer2}
            alt="career"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {career.careName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CardsCareers;
