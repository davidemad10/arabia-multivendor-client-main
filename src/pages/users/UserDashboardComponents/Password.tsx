import { useState } from "react";
import Button from "@mui/material/Button";
import { forgotPassword } from "../../../api/userRequests";
import ConfirmResetOTP from "../../users/SignIn/confirmResetOtp";
import { useSnackbar } from "notistack";
import { t } from "i18next";
import { getUser } from "../../../../public/utils/functions";

export default function ForgotPassword() {
  const [otpOpen, setOtpOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const { enqueueSnackbar } = useSnackbar();
  const token = sessionStorage.getItem("accessToken");
  const { email } = getUser(token);
  console.log(email);

  const handleSubmit = async () => {
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
      <div className="bg-white w-full mx-auto my-5 p-10">
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ backgroundColor: "black" }}
        >
          {t("updatePassword")}
        </Button>
        <ConfirmResetOTP open={otpOpen} setOpen={setOtpOpen} />
      </div>
    </>
  );
}
