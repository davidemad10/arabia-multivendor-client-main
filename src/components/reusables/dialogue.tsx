import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { t } from "i18next";
import { verifyEmail } from "../../api/userRequests";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function FormDialog({ open, setOpen }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(otp: number) {
    try {
      const response = await verifyEmail(otp);
      console.log(response);
      enqueueSnackbar("Account activated successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      handleClose();
      navigate("/signin");
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const otp = formJson.otp;
            console.log(otp);
            handleSubmit(otp);
          },
        }}
      >
        <DialogTitle>Confrim Email Address</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("activateAccount")}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="otp"
            name="otp"
            label="OTP"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
