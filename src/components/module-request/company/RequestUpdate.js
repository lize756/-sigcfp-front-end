import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router";
import { makeStyles, Box, Container } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import axios from "../../../config/axios";
import moment from "moment";

/**
 * Styles of the visual part of the component
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "90%",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

//forma de enviar: 1. el nombre del objeto que se recibe = {el nombre que se envia}
/**
 * This component is responsible for the update of a request for interns by a company
 * @params the intern request to update
 * @returns
 */
const RequestUpdate = ({ request }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a request
   * -------------------------------------------------------------
   */
  const [listCareers, setlistCareers] = useState([]);
  const [careers, setCareers] = useState([]);
  const [defaultCareers, setDefaultCareers] = useState([]);
  const [inteRequFunctions, setInteRequFunctions] = useState([]);
  const [defaultInteRequFunctions, setDefaultInteRequFunctions] = useState();
  const [inteRequCompetencies, setInteRequCompetencies] = useState();
  const [editRequest, setEditRequest] = useState({
    inteRequName: " ",
    inteRequDepartment: "",
    inteRequNumber: 0,
    inteRequStDate: "",
    inteRequBondingType: "",
    inteRequDuration: "",
    inteRequSalary: "",
    inteRequOtherBenefits: "",
  });

  useEffect(() => {
    setEditRequest(request);
    setDefaultCareers(request.careers);

    if (request.inteRequFunctions !== "") {
      const arrayDefaults = request.inteRequFunctions.split(",");
      setDefaultInteRequFunctions(arrayDefaults);
    }
  }, [request]);

  // GET request using axios inside useEffect React hook
  useEffect(() => {
    axios.get("careers").then((res) => {
      setlistCareers(res.data);
    });
  }, []);

  /**
   * This function is responsible for converting the
   * date loaded from the database to the format needed by textfield date
   * @returns  date in correct format
   */
  const getDate = () => {
    const requDate = editRequest.inteRequStDate;
    const datest = moment(requDate, "DD/MM/YYYY").format("yyyy-MM-DD");
    return datest;
  };

  //------------Handlechange functions-----------------------------------
  const handleChange = (e) => {
    setEditRequest({ ...editRequest, [e.target.name]: e.target.value });
  };

  /**
   * This function is responsible for storing the careers selected by the user in the careers list
   * @param {*} value
   */
  const handleSelect = (value) => {
    let arrayCareers = careers;
    arrayCareers[arrayCareers.length] = value;
    setCareers(arrayCareers);
  };

  /**
   * This function is responsible for saving the functionalities entered by the user in the attribute inteRequFunctions
   * @param {*} value
   */
  const handleFunctions = (value) => {
    const functions = value + ",";
    setInteRequFunctions({ ...inteRequFunctions, functions });
  };

  /**
   * This function is responsible for saving the Competencies entered by the user in the attribute inteRequCompetencies
   * @param {*} value
   */
  const handleCompetencies = (value) => {
    const competencies = value + ",";
    setInteRequCompetencies({ ...inteRequCompetencies, competencies });
  };

  const handleDelete = (chipToDelete) => () => {
    setDefaultCareers((chipCrs) =>
      chipCrs.filter((chip) => chip.careId !== chipToDelete.careId)
    );
  };

  const handleDeleteFunctions = (chipToDelete) => () => {
    setDefaultInteRequFunctions((chipCrs) =>
      chipCrs.filter((chip) => chip !== chipToDelete)
    );
  };
  //Metodo put aacomodar toda esta clase
  const putRequest = (e) => {
    e.preventDefault();

    setCareers(careers.concat(defaultCareers));

    const stDate = new Date(editRequest.inteRequStDate).toLocaleDateString(
      "en-GB",
      {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }
    );
    const request = {
      inteRequDuration: editRequest.inteRequDuration,
      inteRequName: editRequest.inteRequName,
      inteRequNumber: editRequest.inteRequNumber,
      inteRequSalary: editRequest.inteRequSalary,
      inteRequDepartament: editRequest.inteRequDepartment,
      inteRequStDate: stDate,
      inteRequFunctions: inteRequFunctions,
      inteRequCompetencies: inteRequCompetencies,
      inteRequBondingType: editRequest.inteRequBondingType,
      inteRequOtherBenefits: editRequest.inteRequOtherBenefits,
      careers: careers,
    };
    console.log(request);
    axios
      .put("internRequests/update/" + request.id, request)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/company/request");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#F2F6FE" }}>
        <form className={classes.root} onSubmit={putRequest}>
          <TextField
            name="inteRequName"
            value={editRequest.inteRequName}
            label="Nombre de la solicitud"
            onChange={handleChange}
          />

          <Box
            sx={{
              bgcolor: "#F2F6FE",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {defaultCareers.map((career) => {
              return (
                <ListItem key={career.careId}>
                  <Chip
                    label={career.careName}
                    onDelete={handleDelete(career)}
                  />
                </ListItem>
              );
            })}
          </Box>

          <Autocomplete
            multiple
            fullWidth
            options={listCareers}
            getOptionLabel={(option) => option.careName}
            name="careers"
            onChange={(e, value) => handleSelect(value)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Carreras de Interés"
                placeholder="Carreras de Interés"
              />
            )}
          />

          <TextField
            id="outlined-textarea"
            name="inteRequDepartment"
            value={editRequest.inteRequDepartment}
            label="Area o Departamento"
            onChange={handleChange}
          />

          <TextField
            name="inteRequNumber"
            value={editRequest.inteRequNumber}
            label="Número de Estudiantes"
            type="number"
            onChange={handleChange}
          />

          <TextField
            name="inteRequStDate"
            label="Fecha de Inicio"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            value={getDate()}
            onChange={handleChange}
          />

          <Autocomplete
            multiple
            fullWidth
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            onChange={(e, value) => handleFunctions(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Funciones Principales"
              />
            )}
          />

          <Autocomplete
            multiple
            fullWidth
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            onChange={(e, value) => handleCompetencies(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Competencias Claves del Éxito"
              />
            )}
          />

          <TextField
            name="inteRequBondingType"
            multiline
            value={editRequest.inteRequBondingType}
            label="Tipo de Vinculación"
            onChange={handleChange}
          />
          <TextField
            name="inteRequDuration"
            label="Duración de la Practica"
            multiline
            value={editRequest.inteRequDuration}
            onChange={handleChange}
          />
          <TextField
            name="inteRequSalary"
            label="Valor de Bonificación"
            type="number"
            value={editRequest.inteRequSalary}
            onChange={handleChange}
          />
          <TextField
            name="inteRequOtherBenefits"
            label="Otros Beneficios"
            value={editRequest.inteRequOtherBenefits}
            multiline
            onChange={handleChange}
          />

          <Button sx={{ mt: 5, pr: 3 }} variant="contained" type="submit">
            Editar Solicitud
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RequestUpdate;
