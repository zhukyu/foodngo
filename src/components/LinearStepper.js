import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PhoneIcon from "@mui/icons-material/Phone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DoneIcon from "@mui/icons-material/Done";


import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import "../css/LinearStepper.scss";
import zIndex from "@mui/material/styles/zIndex";
import congratulaion from "../image/congratulation.gif";
import axiosInstance from "../utility/AxiosInstance";
const useStyles = makeStyles((theme) => ({
  button: {},
}));

function getSteps() {
  return [
    "Account Registration",
    "Contact Information",
    "Personal Information",
  ];
}
const AccountForm = () => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            placeholder="Enter Your Email"
            margin="normal"
            className="email_input"
            color="error"
            style={{ width: "70%", marginLeft: "15%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormControl
            sx={{ m: 1 }}
            variant="outlined"
            style={{ width: "70%", marginLeft: "15%" }}
          >
            <InputLabel
              htmlFor="password"
              color="error"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500"}}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              color="error"
              width="70%"
              margin="normal"
              placeholder="Enter Your Password"
              inputProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
              {...field}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="re_password"
        render={({ field }) => (
          <FormControl
            sx={{ m: 1 }}
            variant="outlined"
            style={{ width: "70%", marginLeft: "15%" }}
          >
            <InputLabel
              htmlFor="re_password"
              color="error"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500"}}
            >
              Re-Password
            </InputLabel>
            <OutlinedInput
              id="re_password"
              type={showRePassword ? "text" : "password"}
              color="error"
              width="70%"
              margin="normal"
              placeholder="Re-Enter Password"
              inputProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
              }}
              {...field}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRePassword}
                    onMouseDown={handleMouseDownRePassword}
                    edge="end"
                  >
                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Re-Password"
            />
          </FormControl>
        )}
      />
    </>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            className="phone_number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "118%", marginLeft: "-9%"}}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            {...field}
          />
        )}
      />
      {/* <Controller
        control={control}
        name="alternatePhone"
        render={({ field }) => (
          <TextField
            id="alternate-phone"
            label="Alternate Phone"
            variant="outlined"
            placeholder="Enter Your Alternate Phone"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "118%", marginLeft: "-9%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            {...field}
          />
        )}
      /> */}
    </>
  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="address"
        render={({ field }) => (
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            placeholder="Enter Your Address"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "118%", marginLeft: "-9%"}}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            {...field}
          />
        )}
      />
      {/* <Controller
        control={control}
        name="address2"
        render={({ field }) => (
          <TextField
            id="address2"
            label="Address 2"
            variant="outlined"
            placeholder="Enter Your Address 2"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "118%", marginLeft: "-9%"}}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500"},
            }}
            {...field}
          />
        )}
      /> */}
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AccountForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/login";
    navigate(path);
  };
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: "",
      // alternatePhone: "",
      address: "",
      // address2: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const sendData = async (data) => {
    await axiosInstance.post("/auth/register", data)
    .then((res) => {
      console.log(res);
    })
  }

  const handleNext = (data) => {
    let _data = {
      email: data.email,
      name: "user name",
      password: data.password,
      phone: data.phoneNumber,
      address: data.address,
      role: "user",
      dob: "2000-01-01",
    }
    if (activeStep == steps.length - 1) {
      sendData(_data);
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 60deg,rgb(239,10,104) 0%,rgb(233,64,87) 50%,rgb(253,13,17) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 60deg,rgb(239,10,104) 0%,rgb(233,64,87) 50%,rgb(253,13,17) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(239,10,104) 0%, rgb(233,64,87) 50%, rgb(253,13,17) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(239,10,104) 0%, rgb(233,64,87) 50%, rgb(253,13,17) 100%)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <AccountBoxIcon />,
      2: <PhoneIcon />,
      3: <FmdGoodIcon />,
      4: <DoneIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {completed ? icons[4] : icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <div className="form_main">
      <h4 className="form_title">Sign Up</h4>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        style={{ marginBottom: "40px" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (

        <Typography
          variant="h3"
          align="center"
          style={{
            marginLeft: "40px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert severity="success" style={{ width: "400px", position: "absolute", top: "0", right: "0" }}><strong>Success</strong> — check it out!</Alert>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <h3 style={{ color: "#1d1d1f" }}>Enjoy Your Food</h3>{" "}
            <img
              src={congratulaion}
              alt="congratulaion"
              style={{ width: "80px", height: "80px", marginTop: "15px" }}
            />
          </div>
          <input
            type="button"
            value="Let's Order"
            style={{ marginLeft: "-45px" }}
            className="lets_order_button"
            onClick={routeChange}
          ></input>
        </Typography>
      ) : (
        <>
          <FormProvider {...methods} style={{ marginTop: "30px" }}>
            <form onSubmit={methods.handleSubmit(handleNext)} style={{ position:"relative"}}>
              {getStepContent(activeStep)}

              <input
                type="button"
                value="Back"
                onClick={handleBack}
                className="back_button"
                disabled={activeStep === 0 ? true : false}
                style={{
                  position:"absolute",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  opacity: activeStep === 0 ? "0" : "1",
                  left: activeStep === 0 ? "35%" : "25%",
                  bottom: activeStep === 0 ? "0" : "-40%",
                  cursor: activeStep === 0 ? "default" : "pointer",
                }}
              />
              <input
                type="submit"
                value={activeStep === steps.length - 1 ? "Finish" : "Next"}
                className="next_button"
                style={{
                  position:"absolute",
                  backgroundColor: "#FF003D",
                  color: "#f5f5f7",
                  right: activeStep === 0 ? "43%" : "25%",
                  bottom: activeStep === 0 ? "-30%" : "-40%",
                }}
              />
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;
