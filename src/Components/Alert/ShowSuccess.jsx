import * as React from "react";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//? Redux
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../../Features/alert/alertSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  let alert = useSelector((state) => state.alert.SHOW_SUCCESS_MESSAGE);

  console.log("alert", alert);
  const [Open, setOpen] = React.useState(alert);
  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  //? useDispatch
  let dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(clearMessages());
  //   }, 2000);
  // }, [alert]);

  //? handleClose
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    console.log("event", event);
    console.log("reason", reason);

    setOpen(false);
    dispatch(clearMessages());
  };

  console.log("State", state);
  console.log("Open", Open);

  React.useEffect(() => {
    setOpen(alert && alert.message ? alert.message : alert);
  }, [alert]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={Open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {Open}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
