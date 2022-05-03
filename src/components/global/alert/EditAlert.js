import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { setAcceptedAlert, setShowAlert } from "../../store/slices/AlertSlice";
//Redux
import { useDispatch, useSelector } from "react-redux";

export default function AlertDialog() {
    console.log("entre")
  /**
   * --------------------------------------------------------
   * -----------------------  REDUX -------------------------
   * --------------------------------------------------------
   */
  // Allow verified if the alert change its state
  const isShowAlert = useSelector((state) => state.AlertSlice.isShowAlert);

  // Allow verified if the state of the obejct alert is change.
  const currentAlert = useSelector((state) => state.AlertSlice.alert);

  // Allow to send the elements of store
  const dispatch = useDispatch();

  const handleDisagree = () => {
    dispatch(setAcceptedAlert(false));
    dispatch(setShowAlert(false));
  };

  const handleAgree = () => {
    dispatch(setAcceptedAlert(true));
    dispatch(setShowAlert(false));
  };

  return (
    <div>
      <Dialog
        open={isShowAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
