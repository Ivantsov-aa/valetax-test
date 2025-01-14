import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {TextField} from "@mui/material";

export default function Modal({modalParams, setModalParams, mutate}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setModalParams(null);
  };

  const handleSubmit = async () => {
    if (modalParams.input && !modalParams.name.trim().length) {
      setModalParams({
        ...modalParams,
        error: "The name must be at least 1 character"
      })
    }

    try {
      await modalParams.action(modalParams);
      mutate();
      setModalParams(null);
    } catch (err) {
      setModalParams({
        ...modalParams,
        error: err.message
      })
    }
  };

  if (!modalParams) {
    return <></>;
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={Boolean(modalParams)}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {modalParams.title}
      </DialogTitle>
      <DialogContent>
        {modalParams.input ? 
          <TextField
            error={Boolean(modalParams.error)}
            autoFocus
            required
            margin="dense"
            id="name"
            label={modalParams.label}
            placeholder="Node name"
            fullWidth
            variant="standard"
            helperText={modalParams.error}
            value={modalParams.name ?? modalParams.prevName}
            onChange={(e) => setModalParams({
              ...modalParams,
              error: "",
              name: e.target.value
            })}
          />
          :
          <DialogContentText>
            {`Do you want to delete ${modalParams.name}?`}
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button {...modalParams.button} onClick={handleSubmit}>
          {modalParams.button.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
