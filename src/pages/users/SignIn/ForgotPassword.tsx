import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { forgotPassword } from "../../../api/userRequests";
import ConfirmResetOTP from "./confirmResetOtp";
import { useSnackbar } from "notistack";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const [otpOpen, setOtpOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSubmit = async (email: string) => {
    const response = await forgotPassword(email.toLowerCase());
    if (response.status == 200) {
      localStorage.setItem("forgotEmail", email.toLowerCase());
      // static massege
      enqueueSnackbar("An OTP was sent to your email to verify it's you", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      console.log(response.error.response.data.message);
      enqueueSnackbar(`${response.error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
    setOtpOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            event.stopPropagation();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            console.log(formJson.email);
            await handleSubmit(formJson.email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <DialogContentText>
            Enter your account&apos;s email address, and we&apos;ll send you a
            link to reset your password.
          </DialogContentText>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email address"
            placeholder="Email address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmResetOTP open={otpOpen} setOpen={setOtpOpen}></ConfirmResetOTP>
    </>
  );
}
