// External Libraries
import { useMemo, useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useSnackbar } from "notistack";
import { NavLink } from "react-router-dom";

// Material-UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material";
import {
  IconButton,
  InputAdornment,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Local Components
import FormDialog from "../../../components/reusables/dialogue";
import { GoogleIcon, FacebookIcon } from "../CustomIcons";

// API Requests
import { registerUser } from "../../../api/userRequests";

// Localization
import { t } from "i18next";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

const countries = [
  {
    code: "+7 840",
    name: "Abkhazia",
  },
  {
    code: "+93",
    name: "Afghanistan",
  },
  {
    code: "+355",
    name: "Albania",
  },
  {
    code: "+213",
    name: "Algeria",
  },
  {
    code: "+1 684",
    name: "American Samoa",
  },
  {
    code: "+376",
    name: "Andorra",
  },
  {
    code: "+244",
    name: "Angola",
  },
  {
    code: "+1 264",
    name: "Anguilla",
  },
  {
    code: "+1 268",
    name: "Antigua and Barbuda",
  },
  {
    code: "+54",
    name: "Argentina",
  },
  {
    code: "+374",
    name: "Armenia",
  },
  {
    code: "+297",
    name: "Aruba",
  },
  {
    code: "+247",
    name: "Ascension",
  },
  {
    code: "+61",
    name: "Australia",
  },
  {
    code: "+672",
    name: "Australian External Territories",
  },
  {
    code: "+43",
    name: "Austria",
  },
  {
    code: "+994",
    name: "Azerbaijan",
  },
  {
    code: "+1 242",
    name: "Bahamas",
  },
  {
    code: "+973",
    name: "Bahrain",
  },
  {
    code: "+880",
    name: "Bangladesh",
  },
  {
    code: "+1 246",
    name: "Barbados",
  },
  {
    code: "+1 268",
    name: "Barbuda",
  },
  {
    code: "+375",
    name: "Belarus",
  },
  {
    code: "+32",
    name: "Belgium",
  },
  {
    code: "+501",
    name: "Belize",
  },
  {
    code: "+229",
    name: "Benin",
  },
  {
    code: "+1 441",
    name: "Bermuda",
  },
  {
    code: "+975",
    name: "Bhutan",
  },
  {
    code: "+591",
    name: "Bolivia",
  },
  {
    code: "+387",
    name: "Bosnia and Herzegovina",
  },
  {
    code: "+267",
    name: "Botswana",
  },
  {
    code: "+55",
    name: "Brazil",
  },
  {
    code: "+246",
    name: "British Indian Ocean Territory",
  },
  {
    code: "+1 284",
    name: "British Virgin Islands",
  },
  {
    code: "+673",
    name: "Brunei",
  },
  {
    code: "+359",
    name: "Bulgaria",
  },
  {
    code: "+226",
    name: "Burkina Faso",
  },
  {
    code: "+257",
    name: "Burundi",
  },
  {
    code: "+855",
    name: "Cambodia",
  },
  {
    code: "+237",
    name: "Cameroon",
  },
  {
    code: "+1",
    name: "Canada",
  },
  {
    code: "+238",
    name: "Cape Verde",
  },
  {
    code: "+ 345",
    name: "Cayman Islands",
  },
  {
    code: "+236",
    name: "Central African Republic",
  },
  {
    code: "+235",
    name: "Chad",
  },
  {
    code: "+56",
    name: "Chile",
  },
  {
    code: "+86",
    name: "China",
  },
  {
    code: "+61",
    name: "Christmas Island",
  },
  {
    code: "+61",
    name: "Cocos-Keeling Islands",
  },
  {
    code: "+57",
    name: "Colombia",
  },
  {
    code: "+269",
    name: "Comoros",
  },
  {
    code: "+242",
    name: "Congo",
  },
  {
    code: "+243",
    name: "Congo, Dem. Rep. of (Zaire)",
  },
  {
    code: "+682",
    name: "Cook Islands",
  },
  {
    code: "+506",
    name: "Costa Rica",
  },
  {
    code: "+385",
    name: "Croatia",
  },
  {
    code: "+53",
    name: "Cuba",
  },
  {
    code: "+599",
    name: "Curacao",
  },
  {
    code: "+537",
    name: "Cyprus",
  },
  {
    code: "+420",
    name: "Czech Republic",
  },
  {
    code: "+45",
    name: "Denmark",
  },
  {
    code: "+246",
    name: "Diego Garcia",
  },
  {
    code: "+253",
    name: "Djibouti",
  },
  {
    code: "+1 767",
    name: "Dominica",
  },
  {
    code: "+1 809",
    name: "Dominican Republic",
  },
  {
    code: "+670",
    name: "East Timor",
  },
  {
    code: "+56",
    name: "Easter Island",
  },
  {
    code: "+593",
    name: "Ecuador",
  },
  {
    code: "+20",
    name: "Egypt",
  },
  {
    code: "+503",
    name: "El Salvador",
  },
  {
    code: "+240",
    name: "Equatorial Guinea",
  },
  {
    code: "+291",
    name: "Eritrea",
  },
  {
    code: "+372",
    name: "Estonia",
  },
  {
    code: "+251",
    name: "Ethiopia",
  },
  {
    code: "+500",
    name: "Falkland Islands",
  },
  {
    code: "+298",
    name: "Faroe Islands",
  },
  {
    code: "+679",
    name: "Fiji",
  },
  {
    code: "+358",
    name: "Finland",
  },
  {
    code: "+33",
    name: "France",
  },
  {
    code: "+596",
    name: "French Antilles",
  },
  {
    code: "+594",
    name: "French Guiana",
  },
  {
    code: "+689",
    name: "French Polynesia",
  },
  {
    code: "+241",
    name: "Gabon",
  },
  {
    code: "+220",
    name: "Gambia",
  },
  {
    code: "+995",
    name: "Georgia",
  },
  {
    code: "+49",
    name: "Germany",
  },
  {
    code: "+233",
    name: "Ghana",
  },
  {
    code: "+350",
    name: "Gibraltar",
  },
  {
    code: "+30",
    name: "Greece",
  },
  {
    code: "+299",
    name: "Greenland",
  },
  {
    code: "+1 473",
    name: "Grenada",
  },
  {
    code: "+590",
    name: "Guadeloupe",
  },
  {
    code: "+1 671",
    name: "Guam",
  },
  {
    code: "+502",
    name: "Guatemala",
  },
  {
    code: "+224",
    name: "Guinea",
  },
  {
    code: "+245",
    name: "Guinea-Bissau",
  },
  {
    code: "+595",
    name: "Guyana",
  },
  {
    code: "+509",
    name: "Haiti",
  },
  {
    code: "+504",
    name: "Honduras",
  },
  {
    code: "+852",
    name: "Hong Kong SAR China",
  },
  {
    code: "+36",
    name: "Hungary",
  },
  {
    code: "+354",
    name: "Iceland",
  },
  {
    code: "+91",
    name: "India",
  },
  {
    code: "+62",
    name: "Indonesia",
  },
  {
    code: "+98",
    name: "Iran",
  },
  {
    code: "+964",
    name: "Iraq",
  },
  {
    code: "+353",
    name: "Ireland",
  },
  {
    code: "+972",
    name: "Israel",
  },
  {
    code: "+39",
    name: "Italy",
  },
  {
    code: "+225",
    name: "Ivory Coast",
  },
  {
    code: "+1 876",
    name: "Jamaica",
  },
  {
    code: "+81",
    name: "Japan",
  },
  {
    code: "+962",
    name: "Jordan",
  },
  {
    code: "+7 7",
    name: "Kazakhstan",
  },
  {
    code: "+254",
    name: "Kenya",
  },
  {
    code: "+686",
    name: "Kiribati",
  },
  {
    code: "+965",
    name: "Kuwait",
  },
  {
    code: "+996",
    name: "Kyrgyzstan",
  },
  {
    code: "+856",
    name: "Laos",
  },
  {
    code: "+371",
    name: "Latvia",
  },
  {
    code: "+961",
    name: "Lebanon",
  },
  {
    code: "+266",
    name: "Lesotho",
  },
  {
    code: "+231",
    name: "Liberia",
  },
  {
    code: "+218",
    name: "Libya",
  },
  {
    code: "+423",
    name: "Liechtenstein",
  },
  {
    code: "+370",
    name: "Lithuania",
  },
  {
    code: "+352",
    name: "Luxembourg",
  },
  {
    code: "+853",
    name: "Macau SAR China",
  },
  {
    code: "+389",
    name: "Macedonia",
  },
  {
    code: "+261",
    name: "Madagascar",
  },
  {
    code: "+265",
    name: "Malawi",
  },
  {
    code: "+60",
    name: "Malaysia",
  },
  {
    code: "+960",
    name: "Maldives",
  },
  {
    code: "+223",
    name: "Mali",
  },
  {
    code: "+356",
    name: "Malta",
  },
  {
    code: "+692",
    name: "Marshall Islands",
  },
  {
    code: "+596",
    name: "Martinique",
  },
  {
    code: "+222",
    name: "Mauritania",
  },
  {
    code: "+230",
    name: "Mauritius",
  },
  {
    code: "+262",
    name: "Mayotte",
  },
  {
    code: "+52",
    name: "Mexico",
  },
  {
    code: "+691",
    name: "Micronesia",
  },
  {
    code: "+1 808",
    name: "Midway Island",
  },
  {
    code: "+373",
    name: "Moldova",
  },
  {
    code: "+377",
    name: "Monaco",
  },
  {
    code: "+976",
    name: "Mongolia",
  },
  {
    code: "+382",
    name: "Montenegro",
  },
  {
    code: "+1664",
    name: "Montserrat",
  },
  {
    code: "+212",
    name: "Morocco",
  },
  {
    code: "+95",
    name: "Myanmar",
  },
  {
    code: "+264",
    name: "Namibia",
  },
  {
    code: "+674",
    name: "Nauru",
  },
  {
    code: "+977",
    name: "Nepal",
  },
  {
    code: "+31",
    name: "Netherlands",
  },
  {
    code: "+599",
    name: "Netherlands Antilles",
  },
  {
    code: "+1 869",
    name: "Nevis",
  },
  {
    code: "+687",
    name: "New Caledonia",
  },
  {
    code: "+64",
    name: "New Zealand",
  },
  {
    code: "+505",
    name: "Nicaragua",
  },
  {
    code: "+227",
    name: "Niger",
  },
  {
    code: "+234",
    name: "Nigeria",
  },
  {
    code: "+683",
    name: "Niue",
  },
  {
    code: "+672",
    name: "Norfolk Island",
  },
  {
    code: "+850",
    name: "North Korea",
  },
  {
    code: "+1 670",
    name: "Northern Mariana Islands",
  },
  {
    code: "+47",
    name: "Norway",
  },
  {
    code: "+968",
    name: "Oman",
  },
  {
    code: "+92",
    name: "Pakistan",
  },
  {
    code: "+680",
    name: "Palau",
  },
  {
    code: "+970",
    name: "Palestinian Territory",
  },
  {
    code: "+507",
    name: "Panama",
  },
  {
    code: "+675",
    name: "Papua New Guinea",
  },
  {
    code: "+595",
    name: "Paraguay",
  },
  {
    code: "+51",
    name: "Peru",
  },
  {
    code: "+63",
    name: "Philippines",
  },
  {
    code: "+48",
    name: "Poland",
  },
  {
    code: "+351",
    name: "Portugal",
  },
  {
    code: "+1 787",
    name: "Puerto Rico",
  },
  {
    code: "+974",
    name: "Qatar",
  },
  {
    code: "+262",
    name: "Reunion",
  },
  {
    code: "+40",
    name: "Romania",
  },
  {
    code: "+7",
    name: "Russia",
  },
  {
    code: "+250",
    name: "Rwanda",
  },
  {
    code: "+685",
    name: "Samoa",
  },
  {
    code: "+378",
    name: "San Marino",
  },
  {
    code: "+966",
    name: "Saudi Arabia",
  },
  {
    code: "+221",
    name: "Senegal",
  },
  {
    code: "+381",
    name: "Serbia",
  },
  {
    code: "+248",
    name: "Seychelles",
  },
  {
    code: "+232",
    name: "Sierra Leone",
  },
  {
    code: "+65",
    name: "Singapore",
  },
  {
    code: "+421",
    name: "Slovakia",
  },
  {
    code: "+386",
    name: "Slovenia",
  },
  {
    code: "+677",
    name: "Solomon Islands",
  },
  {
    code: "+27",
    name: "South Africa",
  },
  {
    code: "+500",
    name: "South Georgia and the South Sandwich Islands",
  },
  {
    code: "+82",
    name: "South Korea",
  },
  {
    code: "+34",
    name: "Spain",
  },
  {
    code: "+94",
    name: "Sri Lanka",
  },
  {
    code: "+249",
    name: "Sudan",
  },
  {
    code: "+597",
    name: "Suriname",
  },
  {
    code: "+268",
    name: "Swaziland",
  },
  {
    code: "+46",
    name: "Sweden",
  },
  {
    code: "+41",
    name: "Switzerland",
  },
  {
    code: "+963",
    name: "Syria",
  },
  {
    code: "+886",
    name: "Taiwan",
  },
  {
    code: "+992",
    name: "Tajikistan",
  },
  {
    code: "+255",
    name: "Tanzania",
  },
  {
    code: "+66",
    name: "Thailand",
  },
  {
    code: "+670",
    name: "Timor Leste",
  },
  {
    code: "+228",
    name: "Togo",
  },
  {
    code: "+690",
    name: "Tokelau",
  },
  {
    code: "+676",
    name: "Tonga",
  },
  {
    code: "+1 868",
    name: "Trinidad and Tobago",
  },
  {
    code: "+216",
    name: "Tunisia",
  },
  {
    code: "+90",
    name: "Turkey",
  },
  {
    code: "+993",
    name: "Turkmenistan",
  },
  {
    code: "+1 649",
    name: "Turks and Caicos Islands",
  },
  {
    code: "+688",
    name: "Tuvalu",
  },
  {
    code: "+1 340",
    name: "U.S. Virgin Islands",
  },
  {
    code: "+256",
    name: "Uganda",
  },
  {
    code: "+380",
    name: "Ukraine",
  },
  {
    code: "+971",
    name: "United Arab Emirates",
  },
  {
    code: "+44",
    name: "United Kingdom",
  },
  {
    code: "+1",
    name: "United States",
  },
  {
    code: "+598",
    name: "Uruguay",
  },
  {
    code: "+998",
    name: "Uzbekistan",
  },
  {
    code: "+678",
    name: "Vanuatu",
  },
  {
    code: "+58",
    name: "Venezuela",
  },
  {
    code: "+84",
    name: "Vietnam",
  },
  {
    code: "+1 808",
    name: "Wake Island",
  },
  {
    code: "+681",
    name: "Wallis and Futuna",
  },
  {
    code: "+967",
    name: "Yemen",
  },
  {
    code: "+260",
    name: "Zambia",
  },
  {
    code: "+255",
    name: "Zanzibar",
  },
  {
    code: "+263",
    name: "Zimbabwe",
  },
];

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const countryItems = useMemo(
    () =>
      countries.map((country, index) => (
        <MenuItem key={index} value={country.code}>
          {`${country.code} (${country.name})`}
        </MenuItem>
      )),
    []
  );

  const handleClickShowPassword = (element: string) => {
    element == "password"
      ? setShowPassword((prev) => !prev)
      : setShowConfirmPassword((prev) => !prev);
  };

  const schema = z
    .object({
      fullname: z
        .string()
        .min(5, { message: "Must be 5 or more characters long" })
        .max(30, { message: "Must be 30 characters long or less" }),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "The Email address is required" }),
      password: z
        .string()
        .min(8, { message: "Must be 8 or more characters long" })
        .max(30, { message: "Must be 30 characters or less" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Must be 8 or more characters long" })
        .max(30, { message: "Must be 30 characters or less" }),
      phoneNumber: z
        .string()
        .min(6, { message: "Must be 6 or more characters long" })
        .max(15, { message: "Must be 15 characters or less" })
        .regex(/^[0-9]+$/, {
          message: "Only numbers are allowed",
        }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      countryCode: "",
      phoneNumber: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      const final = {
        email: values.email,
        full_name: values.fullname,
        password1: values.password,
        password2: values.confirmPassword,
        phone: (values.countryCode + values.phoneNumber).replace(/\s/g, ""),
      };
      console.log("Submitted");
      console.log(final);
      setRequestLoading(true);
      const response = await registerUser(final);
      console.log(response);

      setRequestLoading(false);
      const statusCode = response.request?.status;
      if (statusCode == 201) {
        localStorage.setItem("email", values.email.toLowerCase());
        setDialogueOpen(true);
      } else {
        const errors = response.message.response.data;
        Object.keys(errors).forEach((key) => {
          const value = errors[key];
          enqueueSnackbar(`${value}`, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        });
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              {t("register")}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* full name */}
              <FormControl>
                <FormLabel htmlFor="fullname">{t("fullName")}</FormLabel>
                <TextField
                  autoComplete="fullname"
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  placeholder="Jon Snow"
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullname && Boolean(formik.errors.fullname)
                  }
                  helperText={formik.touched.fullname && formik.errors.fullname}
                  color={formik.errors.fullname ? "error" : "primary"}
                />
              </FormControl>
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
                <FormLabel htmlFor="password">{t("password")}</FormLabel>
                <TextField
                  required
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
                  helperText={formik.touched.password && formik.errors.password}
                  color={formik.errors.password ? "error" : "primary"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword("password")}
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
                <FormLabel htmlFor="confirmPassword">
                  {t("confirmPassword")}
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  placeholder="••••••"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  variant="outlined"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  color={formik.errors.confirmPassword ? "error" : "primary"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword("Not")}
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

              {/* Phone number */}
              <FormLabel htmlFor="phoneNumber">{t("phoneNumber")}</FormLabel>
              <div className="flex ">
                <FormControl
                  variant="outlined"
                  style={{ marginRight: "16px", minWidth: "120px" }}
                >
                  <InputLabel id="country-code-label">
                    {t("countryCode")}
                  </InputLabel>
                  <Select
                    labelId="country-code-label"
                    id="countryCode"
                    name="countryCode"
                    value={formik.values.countryCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.countryCode &&
                      Boolean(formik.errors.countryCode)
                    }
                  >
                    {countryItems}
                  </Select>
                </FormControl>

                <TextField
                  required
                  name="phoneNumber"
                  placeholder="111111111"
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
                  fullWidth
                />
              </div>
              {requestLoading ? (
                <LoadingButton
                  loading
                  loadingIndicator="Loading…"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "black",
                    borderRadius: "7px",
                    marginTop: "10px",
                  }}
                >
                  {t("register")}
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "black",
                    borderRadius: "7px",
                    marginTop: "10px",
                  }}
                >
                  {t("register")}
                </Button>
              )}

              <Typography sx={{ textAlign: "center" }}>
                {t("haveAnAccount")}
                <span>
                  <NavLink
                    to="/signin"
                    style={{
                      alignSelf: "center",
                      color: "rgb(28, 120, 210)",
                      textDecoration: "underline",
                      marginLeft: "8px",
                      marginRight: "8px",
                    }}
                  >
                    {t("login")}
                  </NavLink>
                </span>
              </Typography>
            </Box>

            <Divider>
              <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign up with Google")}
                startIcon={<GoogleIcon />}
              >
                {t("signUpWithGoogle")}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign up with Facebook")}
                startIcon={<FacebookIcon />}
              >
                {t("signUpWithFacebook")}
              </Button>
            </Box>
          </Card>
        </SignUpContainer>
      </form>
      <FormDialog open={dialogueOpen} setOpen={setDialogueOpen}></FormDialog>
    </>
  );
}
