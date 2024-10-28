import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { t } from "i18next";
import { verifyResetOTP } from "../../../api/userRequests";
import { useSnackbar } from "notistack";
import NewPasswordDialogue from "../../../components/reusables/newPasswordDialogue";
import { confirmResetOTPparams } from "../../../types";

export default function ConfirmResetOTP({
  open,
  setOpen,
}: confirmResetOTPparams) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [resetPasswordDialogueOpen, setResetPasswordDialogueOpen] =
    React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(otp: number) {
    try {
      setLoading(true);
      const response = await verifyResetOTP(otp);
      console.log(response);
      if (response.status == 200) {
        enqueueSnackbar("OTP verified! password reset successfully.", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setResetPasswordDialogueOpen(true);
        handleClose();
      } else {
        enqueueSnackbar("Couldn't do it sorry", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
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
    } finally {
      setLoading(false);
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
        <DialogContent sx={{ width: "30vw", padding: "20px" }}>
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
        <DialogActions className="gap-3">
          <Button onClick={handleClose} sx={{ color: "black" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            sx={{ backgroundColor: "black", color: "white" }}
          >
            Confirm OTP
          </Button>
        </DialogActions>
      </Dialog>
      <NewPasswordDialogue
        open={resetPasswordDialogueOpen}
        setOpen={setResetPasswordDialogueOpen}
      ></NewPasswordDialogue>
    </React.Fragment>
  );
}
