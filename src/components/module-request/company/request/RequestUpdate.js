import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Button, Chip, Checkbox } from "@mui/material";
import { useNavigate } from "react-router";
import { makeStyles, Box, Container } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { updateInternRequest } from "../../../store/slices/InternRequestSlice";
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
const RequestUpdate = () => {
  /**
   * Redux
   */
  const list_carreers = useSelector((state) => state.CareerSlice.listCareers);
  const request = useSelector((state) => state.InternRequestSlice.intReq);

  // Allow to send the elements of store
  const dispatch = useDispatch();

  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  const classes = useStyles();
  let navigate = useNavigate();

  /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a request
   * -------------------------------------------------------------
   */
  //const [listCareers, setlistCareers] = useState([]);
  const [careers, setCareers] = useState([]);
  /**
   * Careers states
   */
  const [defaultCareers, setDefaultCareers] = useState([]);

  /**
   * Inter request functions states
   */
  const [defaultInteRequFunctions, setDefaultInteRequFunctions] = useState([]);
  const [inteRequFunctions, setInteRequFunctions] = useState([]);

  /**
   * Inter request competencies states.
   */
  const [inteRequCompetencies, setInteRequCompetencies] = useState([]);
  const [
    defaultInteRequCompetencies,
    setDefaultInteRequCompetencies,
  ] = useState([]);
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
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    setEditRequest(request);
    setIsRender(true);

    /**
     * Carreers
     */
    setDefaultCareers(request.careers);
    //setCareers(list_carreers);
    /**
     * Intern request functions
     */
    if (request.inteRequFunctions !== "") {
      const arrayDefaults = request.inteRequFunctions.split(",");
      setDefaultInteRequFunctions(arrayDefaults);
      setInteRequFunctions(arrayDefaults);
    }

    /**
     * Intern request competencies
     */
    if (request.inteRequCompetencies !== "") {
      const arrayDefaults = request.inteRequCompetencies.split(",");
      setDefaultInteRequCompetencies(arrayDefaults);
      setInteRequCompetencies(arrayDefaults);
    }
  }, [request]);

  /**
   * This function is responsible for converting the
   * date loaded from the database to the format needed by textfield date
   * @returns  date in correct format
   */
  const getDate = () => {
    const [day, month, year] = editRequest.inteRequStDate.split("/");
    return year + "-" + month + "-" + day;
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
    console.log(value);
    setCareers(value);
  };

  /**
   * This function is responsible for saving the functionalities entered by the user in the attribute inteRequFunctions
   * @param {*} value
   */
  const handleFunctions = (value) => {
    const functions = value;
    setInteRequFunctions(functions);
  };

  /**
   * This function is responsible for saving the Competencies entered by the user in the attribute inteRequCompetencies
   * @param {*} value
   */
  const handleCompetencies = (value) => {
    //const competencies = [...new Set([...defaultInteRequCompetencies, ...value]),];
    const competencies = value;
    console.log(competencies);
    setInteRequCompetencies(competencies);
  };

  const handleDelete = (chipToDelete) => () => {
    setDefaultCareers((chipCrs) =>
      chipCrs.filter((chip) => chip.careId !== chipToDelete.careId)
    );
  };

  /**
   * This function allow delete the duplicate elements in the result of concat both array of objects
   * @param {Array} arrayA Array of object to concat
   * @param {Array} arrayB Array of object to concat
   * @returns
   */
  const removeDuplicateItems = (arrayA, arrayB) => {
    const arrayC = arrayA.concat(arrayB);
    return arrayC.filter((element, index, array) => {
      if (array.filter((v) => v.careId === element.careId).length > 1) {
        array.splice(index, 1);
      }
      return array;
    });
  };
  //Metodo put aacomodar toda esta clase
  const putRequest = (e) => {
    e.preventDefault();
    /**
     * This line allow formatter of elements that the user write in the user interface
     * for the format to be accepted by the database
     */
    /**
     * Formatted dates
     */
    const [year, month, day] = editRequest.inteRequStDate.split("-");
    // Verified that date have the size of default
    const formattedStDate =
      editRequest.inteRequStDate === request.inteRequStDate
        ? request.inteRequStDate
        : day + "/" + month + "/" + year;
    /**
     * Formatted arrays
     */
    const formattedFunctions = inteRequFunctions.toString();
    const formattedCompetencies = inteRequCompetencies.toString();
    const formattedCareers = [...new Set([...careers])];

    const requesUpdate = {
      inteRequId: editRequest.inteRequId,
      inteRequDuration: editRequest.inteRequDuration,
      inteRequName: editRequest.inteRequName,
      inteRequNumber: editRequest.inteRequNumber,
      inteRequSalary: editRequest.inteRequSalary,
      inteRequDepartment: editRequest.inteRequDepartment,
      inteRequStDate: formattedStDate,
      inteRequCreate: request.inteRequCreate,
      inteRequFunctions: formattedFunctions,
      inteRequCompetencies: formattedCompetencies,
      inteRequBondingType: editRequest.inteRequBondingType,
      inteRequOtherBenefits: editRequest.inteRequOtherBenefits,
      company: editRequest.company,
      careers: formattedCareers,
    };
    console.log(JSON.stringify(requesUpdate));

    dispatch(
     updateInternRequest(ACCESS_TOKEN, requesUpdate.inteRequId, requesUpdate)
    );
    navigate("/company/request");
  };
  const options = [
    { id: "10", text: "One" },
    { id: "20", text: "Two" },
    { id: "30", text: "Three" },
  ];
  const [value, setValue] = useState([
    { id: "10", text: "One" },
    { id: "20", text: "Two" },
    { id: "30", text: "Three" },
  ]);
  if (isRender) {
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
              defaultValue={defaultCareers}
              options={list_carreers}
              freeSolo
              getOptionLabel={(option) => option.careName}
              getOptionSelected={(option, value) =>
                option.careId === value.careId
              }
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
              defaultValue={getDate()}
              onChange={handleChange}
            />

            <Autocomplete
              multiple
              fullWidth
              defaultValue={defaultInteRequFunctions}
              options={inteRequFunctions}
              freeSolo
              getOptionLabel={(option) => option}
              getOptionSelected={(option, value) => option === value}
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
              defaultValue={defaultInteRequCompetencies}
              options={inteRequCompetencies}
              freeSolo
              getOptionLabel={(option) => option}
              getOptionSelected={(option, value) => option === value}
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
  } else {
    return <></>;
  }
};

export default RequestUpdate;
