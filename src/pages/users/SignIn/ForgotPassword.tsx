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
import { t } from "i18next";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const [otpOpen, setOtpOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (email: string) => {
    setLoading(true); // Start loading
    try {
      const response = await forgotPassword(email.toLowerCase());
      if (response.status === 200) {
        localStorage.setItem("forgotEmail", email.toLowerCase());
        enqueueSnackbar("An OTP was sent to your email to verify it's you.", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setOtpOpen(true);
        handleClose();
      } else {
        throw new Error(
          response.error?.response?.data?.message || "Unexpected error"
        );
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } finally {
      setLoading(false); // Stop loading
    }
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
            const { email } = Object.fromEntries(formData.entries()) as {
              email: string;
            };
            await handleSubmit(email);
          },
        }}
      >
        <DialogTitle>{t("resetPassword")}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <DialogContentText>{t("enterEmailToSendOTP")}</DialogContentText>
          <OutlinedInput
            autoFocus
            required
            id="email"
            name="email"
            placeholder="Email address"
            type="email"
            fullWidth
            disabled={loading}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3, gap: 3 }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{ color: "black" }}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ backgroundColor: "black" }}
          >
            {t("continue")}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmResetOTP open={otpOpen} setOpen={setOtpOpen} />
    </>
  );
}
