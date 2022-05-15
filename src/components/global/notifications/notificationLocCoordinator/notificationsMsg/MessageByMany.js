import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Grid, Button, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

/**
 * Styles of the visual part of the component
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 2),
  },
}));

const validationSchema = yup.object({
  topic: yup
    .string("Ingrese el asunto del mensaje")
    .required("Campo obligatorio"),
  message: yup
    .string("Ingresa el mensaje que desea enviar ")
    .required("Campo obligatorio"),
});

const notification = {
  topic: "Mensaje para reimundo y todo el mundo :)",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
};

const MessageByMany = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      topic: notification.topic,
      message: notification.message,
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={classes.paper}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue={formik.values.topic}
              label="Asunto"
              name="topic"
              onChange={formik.handleChange}
              error={formik.touched.topic && Boolean(formik.errors.topic)}
              helperText={formik.touched.topic && formik.errors.topic}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue={formik.values.message}
              label="Mensaje"
              name="message"
              multiline
              rows={10}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default MessageByMany;
