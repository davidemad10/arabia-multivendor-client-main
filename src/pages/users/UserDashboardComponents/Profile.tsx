// External Libraries
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Material-UI Components
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Localization
import { t } from "i18next";
import { useState } from "react";
import { getUser } from "../../../../public/utils/functions";
export default function Profile() {
  // const [requestLoading, setRequestLoading] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const user = getUser(token);
  // console.log(user);

  const initialInputStatus = {
    fullname: true,
    email: true,
    Password: true,
    phoneNumber: true,
  };

  const [inActiveFields, setInActiveFields] = useState(initialInputStatus);

  const schema = z.object({
    fullname: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(50, { message: "Must be 50 characters long or less" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "The Email address is required" }),
    phoneNumber: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" })
      .max(15, { message: "Must be 15 characters or less" })
      .regex(/^\+?[0-9]+$/, {
        message: "Only numbers are allowed",
      }),
  });

  const formik = useFormik({
    initialValues: {
      fullname: user.full_name,
      email: "Abanoub@gmail.com",
      phoneNumber: user.phone,
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="bg-white w-full mx-auto my-5 p-10">
      <p className="text-gray-700 font-semibold mb-5">{t("PersonalInfo")}</p>
      <form onSubmit={formik.handleSubmit}>
        <Box className="flex flex-wrap gap-9">
          {/* full name */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="fullname">{t("fullName")}</FormLabel>
            <div className="w-full flex gap-4 items-center">
              <TextField
                disabled={inActiveFields.fullname}
                className="w-10/12"
                autoComplete="fullname"
                name="fullname"
                required
                id="fullname"
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                helperText={formik.touched.fullname && formik.errors.fullname}
                color={formik.errors.fullname ? "error" : "primary"}
              />
              <span
                onClick={() => {
                  setInActiveFields((state) => ({
                    ...state,
                    fullname: !state.fullname,
                  }));
                }}
              >
                <EditIcon className="hover:cursor-pointer" color="action" />
              </span>
            </div>
          </FormControl>

          <FormControl className="w-5/12">
            <FormLabel htmlFor="email">{t("email")}</FormLabel>
            <div className="w-full flex gap-4 items-center">
              <TextField
                disabled
                className="w-10/12"
                required
                id="email"
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
              <span
                onClick={() => {
                  setInActiveFields((state) => ({
                    ...state,
                    email: !state.email,
                  }));
                }}
              >
                <EditIcon className="hover:cursor-pointer" color="action" />
              </span>
            </div>
          </FormControl>

          <FormControl className="w-5/12 flex">
            <FormLabel htmlFor="phoneNumber">{t("phoneNumber")}</FormLabel>
            <div className="w-full flex gap-4 items-center">
              <TextField
                disabled={inActiveFields.phoneNumber}
                className="w-10/12"
                required
                name="phoneNumber"
                type="text"
                id="phoneNumber"
                variant="outlined"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                color={formik.errors.phoneNumber ? "error" : "primary"}
              />
              <span
                onClick={() => {
                  setInActiveFields((state) => ({
                    ...state,
                    phoneNumber: false,
                  }));
                }}
              >
                <EditIcon className="hover:cursor-pointer" color="action" />
              </span>
            </div>
          </FormControl>
          {/*
           */}
        </Box>
        <Button
          type="submit"
          disabled={!formik.dirty && formik.isValid}
          variant="contained"
          className="w-1/5"
          sx={{
            background: "black",
            borderRadius: "3px",
            marginTop: "30px",
          }}
        >
          <p className="font-semibold">{t("updateProfile")}</p>
        </Button>
      </form>
    </div>
  );
}
