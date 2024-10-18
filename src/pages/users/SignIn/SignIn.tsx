import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon } from "../CustomIcons";
import { z } from "zod";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { login } from "../../../api/userRequests";
import { useSnackbar } from "notistack";
import MuiCard from "@mui/material/Card";
import {
  Card,
  SignUpContainer as SignInContainer,
} from "../SignUp/CustomMUIComponents";

interface loginFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values: loginFormData) => {
    try {
      const data = {
        ...values,
        email: values.email.toLowerCase(),
      };
      console.log(data);
      const response = await login(data);
      console.log(response);
      enqueueSnackbar("Logged In successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      const token = response.data.tokens.access;
      console.log(token);

      //! i need to handle access and refresh tokens

      navigate("/", { replace: true });
    } catch (error: any) {
      enqueueSnackbar(
        `${
          error?.response?.data?.detail ||
          "unexpected error occured, please try again in a few minutes"
        }`,
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    }
  };

  const schema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "The Email address is required" }),
    password: z.string().min(1, { message: "The password is required" }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="w-3/5 max-h-fit mx-auto rounded-md overflow-hidden desktop:shadow-[0_0_10px_rgba(0,0,0,0.5)] desktop:bg-mainColor flex justify-center align-middle desktop:justify-between">
      <div className="w-5/6 desktop:w-1/2">
        <form onSubmit={formik.handleSubmit}>
          <SignInContainer
            direction="column"
            justifyContent="space-between"
            className="!h-full"
          >
            <Card variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                {t("login")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                {/* email */}
                <FormControl>
                  <FormLabel htmlFor="email">{t("email")}</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    color={formik.errors.email ? "error" : "primary"}
                  />
                </FormControl>

                {/* password */}
                <FormControl>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormLabel htmlFor="password">{t("password")}</FormLabel>
                    <Link
                      component="button"
                      type="button"
                      onClick={handleClickOpen}
                      variant="body2"
                      sx={{
                        alignSelf: "baseline",
                        color: "black",
                      }}
                    >
                      {t("forgotPassword")}
                    </Link>
                  </Box>
                  <TextField
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    color={formik.errors.password ? "error" : "primary"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword()}
                            onMouseDown={(event) => event.preventDefault()} // Prevent focus loss
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ background: "black", borderRadius: "10px" }}
                >
                  {t("login")}
                </Button>
              </Box>
              <Divider>
                <Typography sx={{ color: "text.secondary" }}>or</Typography>
              </Divider>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                <a href="#" className="p-3 border-2 rounded-full">
                  <GoogleIcon />
                </a>
                <a href="#" className="p-3 border-2 rounded-full">
                  <FacebookIcon />
                </a>
              </Box>
            </Card>
          </SignInContainer>
          <ForgotPassword open={open} handleClose={handleClose} />
        </form>
      </div>
      <div className="w-1/2 p-10 pt-20 hidden desktop:block">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "500",
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            marginBottom: "100px",
          }}
        >
          {t("welcomeHeader")}
        </Typography>{" "}
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: "white",
            textAlign: "center",
            width: "100%",
            marginBottom: "30px",
            fontSize: "clamp(1rem, 5vw, 1.15rem)",
          }}
        >
          {t("NewComerMessage")}
        </Typography>{" "}
        <Typography sx={{ textAlign: "center" }}>
          <span>
            <NavLink
              to="/signup"
              style={{
                alignSelf: "center",
                marginLeft: "8px",
                marginRight: "8px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: "50%",
                  color: "white",
                  borderColor: "white",
                  borderRadius: "25px",
                }}
              >
                {t("register")}
              </Button>
            </NavLink>
          </span>
        </Typography>
      </div>
    </div>
  );
}
