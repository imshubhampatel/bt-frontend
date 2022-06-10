import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//? Redux
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../../Features/alert/alertSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  let alert = useSelector((state) => state.alert.SHOW_ERROR_MESSAGE);
  const [Open, setOpen] = React.useState(alert);
  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });

  //? destructuring
  const { vertical, horizontal } = state;

  //? useDispatch
  let dispatch = useDispatch();

  //   setTimeout(() => {
  //     dispatch(clearMessages());
  //   }, 2000);

  //? handleclose
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // console.log("event", event);
    // console.log("reason", reason);

    setOpen(false);
    dispatch(clearMessages());
  };

  // console.log("State", state);
  // console.log("Open", Open);

  React.useEffect(() => {
    setOpen(alert && alert.message ? alert.message : alert);
  }, [alert]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={Open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {Open}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
