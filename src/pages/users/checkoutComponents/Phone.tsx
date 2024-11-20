import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { t } from "i18next";
import { getUser } from "../../../../public/utils/functions";
import { getUserInfo, updateUserInfo } from "../../../api/userRequests";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import Loader from "../../../components/reusables/Loader";

interface props {
  navigate: () => void;
}

const AddressData: React.FC<props> = ({ navigate }) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const token = sessionStorage.getItem("accessToken");
  const user = getUser(token);
  const id = user?.user_id;

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["account", "users", id],
    queryFn: () => getUserInfo(id),
  });

  const schema = z.object({
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
      phoneNumber: data?.data.phone || "",
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      const info = { phone: values.phoneNumber };
      if (!formik.dirty) {
        navigate();
        return;
      }
      try {
        setRequestLoading(true);
        const response = await updateUserInfo(info, user.user_id);
        if (response.status === 200) {
          enqueueSnackbar("Your info updated successfully", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          refetch();
        } else {
          enqueueSnackbar("Couldn't update your info", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      } catch (error) {
        console.error(error);
        enqueueSnackbar("An error occurred while updating your info", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } finally {
        setRequestLoading(false);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="mt-44 flex justify-center items-center">
        <Loader isLoading={true}></Loader>
      </div>
    );
  }

  if (error) {
    return <div>Error loading user information.</div>;
  }

  return (
    <div className="bg-white w-full mx-auto my-5 p-10">
      <p className="text-gray-700 font-semibold mb-5">{t("confirmPhone")}</p>
      <form onSubmit={formik.handleSubmit}>
        <Box className="flex flex-wrap gap-9">
          {/* Phone Number */}
          <FormControl className="w-5/12 flex">
            <FormLabel htmlFor="phoneNumber">{t("phoneNumber")}</FormLabel>
            <div className="w-full flex gap-4 items-center">
              <TextField
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
            </div>
          </FormControl>
        </Box>
        {requestLoading ? (
          <LoadingButton
            loading
            loadingIndicator={t("loading")}
            variant="contained"
            className="w-1/5"
            sx={{ background: "black", borderRadius: "3px", marginTop: "30px" }}
          >
            {t("submit")}
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            disabled={!formik.isValid}
            variant="contained"
            className="w-1/5"
            sx={{ background: "black", borderRadius: "3px", marginTop: "30px" }}
          >
            <p className="font-semibold">{t("next")}</p>
          </Button>
        )}
      </form>
    </div>
  );
};
export default AddressData;
