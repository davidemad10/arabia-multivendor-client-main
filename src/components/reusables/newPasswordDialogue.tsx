import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { z } from "zod";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { updatePassword } from "../../api/userRequests";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function NewPasswordDialogue({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const schema = z
    .object({
      new_password: z
        .string()
        .min(8, { message: "Must be 8 or more characters long" })
        .max(30, { message: "Must be 30 characters or less" }),
      confirm_password: z
        .string()
        .min(8, { message: "Must be 8 or more characters long" })
        .max(30, { message: "Must be 30 characters or less" }),
    })
    .superRefine(({ confirm_password, new_password }, ctx) => {
      if (confirm_password !== new_password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirm_password"],
        });
      }
    });

  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await updatePassword(values);
        if (response.error) {
          console.error("Password update failed:", response.error);
          enqueueSnackbar(`${response.error?.message}`, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          return;
        }
        enqueueSnackbar("Password updated successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        console.log("Password updated successfully:", response);
        navigate("/signin");
        handleClose();
      } catch (error: any) {
        console.error(error);
        enqueueSnackbar(
          "Couldn't reset your password please try again in a few minutes",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      }
    },
  });

  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>{t("resetPasswordTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("resetYourPassword")}</DialogContentText>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col my-4 gap-6"
          >
            {/* New password */}
            <FormControl>
              <FormLabel htmlFor="new_password">{t("password")}</FormLabel>
              <TextField
                required
                fullWidth
                name="new_password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                id="new_password"
                autoComplete="new_password"
                variant="outlined"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.new_password &&
                  Boolean(formik.errors.new_password)
                }
                helperText={
                  formik.touched.new_password && formik.errors.new_password
                }
                color={formik.errors.new_password ? "error" : "primary"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        onMouseDown={(event) => event.preventDefault()} // Prevent focus loss
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            {/*Confirm password */}
            <FormControl>
              <FormLabel htmlFor="confirm_password">
                {t("confirmPassword")}
              </FormLabel>
              <TextField
                required
                fullWidth
                name="confirm_password"
                placeholder="••••••"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                autoComplete="confirm_password"
                variant="outlined"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirm_password &&
                  Boolean(formik.errors.confirm_password)
                }
                helperText={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
                color={formik.errors.confirm_password ? "error" : "primary"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        onMouseDown={(event) => event.preventDefault()} // Prevent focus loss
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <DialogActions className="flex">
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
