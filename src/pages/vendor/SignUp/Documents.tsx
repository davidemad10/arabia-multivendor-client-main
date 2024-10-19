// Material-UI Components
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Box, FormControl, FormLabel, Input } from "@mui/material";

// Local imports
import {
  Card,
  SignUpContainer,
} from "../../../components/reusables/CustomMUIComponents";

// Localization
import { t } from "i18next";

// Formik and Zod imports
import { Formik, Form, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Validation schema using Zod
const documentSchema = z.object({
  idFront: z
    .any()
    .refine((file) => file instanceof File, { message: t("idFront") }),
  idBack: z
    .any()
    .refine((file) => file instanceof File, { message: t("idBack") }),
  taxCard: z
    .any()
    .refine((file) => file instanceof File, { message: t("taxCard") }),
  commercialRecord: z.any().refine((file) => file instanceof File, {
    message: t("commercialRecord"),
  }),
  bankStatement: z.any().refine((file) => file instanceof File, {
    message: t("bankStatement"),
  }),
});

// TypeScript Props Interface
interface StepComponentProps {
  onNext: () => void;
  onPrev: () => void;
}

// Form submission handler
const handleSubmit = (values: any) => {
  console.log(values);
};

const Documents: React.FC<StepComponentProps> = ({ onNext, onPrev }) => {
  return (
    <div className="w-2/5 shadow rounded mx-auto">
      <Formik
        initialValues={{
          idFront: null,
          idBack: null,
          taxCard: null,
          commercialRecord: null,
          bankStatement: null,
        }}
        validationSchema={toFormikValidationSchema(documentSchema)}
        onSubmit={(values) => {
          handleSubmit(values); // Log form values
          onNext(); // Proceed to the next step
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <CssBaseline enableColorScheme />
            <SignUpContainer direction="column" justifyContent="space-between">
              <Card variant="outlined">
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    width: "100%",
                    fontSize: "clamp(2rem, 10vw, 2.15rem)",
                  }}
                >
                  {t("documents")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    marginBottom: "20px",
                  }}
                >
                  {/* ID Front */}
                  <FormControl>
                    <FormLabel htmlFor="idFront">{t("idFront")}</FormLabel>
                    <Input
                      id="idFront"
                      name="idFront"
                      type="file"
                      onChange={(e) =>
                        setFieldValue(
                          "idFront",
                          e.currentTarget.files?.[0] || null
                        )
                      }
                    />
                    <ErrorMessage
                      name="idFront"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  {/* ID Back */}
                  <FormControl>
                    <FormLabel htmlFor="idBack">{t("idBack")}</FormLabel>
                    <Input
                      id="idBack"
                      name="idBack"
                      type="file"
                      onChange={(e) =>
                        setFieldValue(
                          "idBack",
                          e.currentTarget.files?.[0] || null
                        )
                      }
                    />
                    <ErrorMessage
                      name="idBack"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  {/* Tax Card */}
                  <FormControl>
                    <FormLabel htmlFor="taxCard">{t("taxCard")}</FormLabel>
                    <Input
                      id="taxCard"
                      name="taxCard"
                      type="file"
                      onChange={(e) =>
                        setFieldValue(
                          "taxCard",
                          e.currentTarget.files?.[0] || null
                        )
                      }
                    />
                    <ErrorMessage
                      name="taxCard"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  {/* Commercial Record */}
                  <FormControl>
                    <FormLabel htmlFor="commercialRecord">
                      {t("commercialRecord")}
                    </FormLabel>
                    <Input
                      id="commercialRecord"
                      name="commercialRecord"
                      type="file"
                      onChange={(e) =>
                        setFieldValue(
                          "commercialRecord",
                          e.currentTarget.files?.[0] || null
                        )
                      }
                    />
                    <ErrorMessage
                      name="commercialRecord"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  {/* Bank Statement */}
                  <FormControl>
                    <FormLabel htmlFor="bankStatement">
                      {t("bankStatement")}
                    </FormLabel>
                    <Input
                      id="bankStatement"
                      name="bankStatement"
                      type="file"
                      onChange={(e) =>
                        setFieldValue(
                          "bankStatement",
                          e.currentTarget.files?.[0] || null
                        )
                      }
                    />
                    <ErrorMessage
                      name="bankStatement"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>
                </Box>

                <div className="flex justify-between">
                  <Button
                    variant="contained"
                    sx={{
                      background: "black",
                      borderRadius: "7px",
                      marginTop: "10px",
                      width: "20%",
                    }}
                    onClick={onPrev}
                  >
                    {t("previous")}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: "black",
                      borderRadius: "7px",
                      marginTop: "10px",
                      width: "20%",
                    }}
                    type="submit"
                  >
                    {t("next")}
                  </Button>
                </div>
              </Card>
            </SignUpContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Documents;
