import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { t } from "i18next";
import { verifyResetOTP } from "../../../api/userRequests";
import { useSnackbar } from "notistack";

export default function ConfirmResetOTP({ open, setOpen }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(otp: number) {
    try {
      const response = await verifyResetOTP(otp);
      console.log(response);
      enqueueSnackbar("OTP verified! password reset successfully.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      handleClose();
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(
        error.response?.data?.message ||
          "Failed to verify OTP. Please try again.",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
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
            event.stopPropagation();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const otp = formJson.otp;
            console.log(otp);
            handleSubmit(otp);
          },
        }}
      >
        <DialogTitle>Email Reset Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter OTP to reset password</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="otp"
            name="otp"
            label="Enter OTP"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Confirm OTP</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
