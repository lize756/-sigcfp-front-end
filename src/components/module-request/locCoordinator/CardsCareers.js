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
import { getInternRequestByCareer } from "../../store/slices/InternRequestSlice";
import { useNavigate } from "react-router";
/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
// component="video"
// height="140"
// style={{
//   backgroundColor: randomColor(),
// }}
const CardsCareers = ({ index, career }) => {
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //navigate
  let navigate = useNavigate();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };
  const handleChange = () => {
    console.log(career.careId);
    dispatch(getInternRequestByCareer(ACCESS_TOKEN, career.careId));
    navigate("/location/requests");
  };
  return (
    <>
      {" "}
      <Card sx={{ maxWidth: 310 }}>
        <CardActionArea onClick={handleChange}>
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
