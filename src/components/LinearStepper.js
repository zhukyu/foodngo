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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { DatePicker } from "antd";

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
  set,
} from "react-hook-form";
import "../css/LinearStepper.scss";
import zIndex from "@mui/material/styles/zIndex";
import congratulaion from "../image/congratulation.gif";
import axiosInstance from "../utility/AxiosInstance";
const useStyles = makeStyles((theme) => ({
  button: {},
  input: {
    '& input[type=number]': {
        '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    }
  },
}));



function getSteps() {
  return [
    "Account Registration",
    "Personal Information",
    "Address Information",
  ];
}
const AccountForm = (isValidEmailState, isValidPasswordState, isValidRePasswordState) => {
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
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            {...field}
          />
        )}
      />
      <p className={isValidEmailState ?  "email_valid" : "email_error"}>Invalid email</p>

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormControl
            sx={{ m: 1 }}
            variant="outlined"
            style={{ width: "70%", marginLeft: "15%"}}
          >
            <InputLabel
              htmlFor="password"
              color="error"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500" }}
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
      <p className={isValidPasswordState ?  "password_valid" : "passowrd_error"}>Password must be 6 char long</p>
      <Controller
        control={control}
        name="re_password"
        render={({ field }) => (
          <FormControl
            sx={{ m: 1 }}
            variant="outlined"
            style={{ width: "70%", marginLeft: "15%"}}
          >
            <InputLabel
              htmlFor="re_password"
              color="error"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500" }}
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
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
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
      <p className={isValidRePasswordState ?  "repassword_valid" : "repassword_error"}>Doesn't match the password</p>
    </>
  );
};
const AddressForm = () => {
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
            style={{ width: "70%", marginLeft: "15%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            {...field}
          />
        )}
      />
    </>
  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            placeholder="Enter Your Name"
            fullWidth
            margin="normal"
            color="error"
            style={{ width: "70%", marginLeft: "15%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="dob"
        render={({ field }) => (
      <DatePicker
        id="dob"
        size="large"
        className= {isFocused ? "date_picker focused" : "date_picker"}
        style={{
          width: "70%",
          height: "56px",
          marginLeft: "15%",
          marginTop: "1%",
          borderRadius: "15px",
          backgroundColor: "#f5f5f7",
          fontFamily: "Poppins,sans-serif",
          fontWeight: "500",
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {setIsFocused(false)}}
        {...field}
      />
      )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            className={classes.input}
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            color="error"
            type="number"
            style={{ width: "70%", marginLeft: "15%" }}
            inputProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            InputLabelProps={{
              style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
            }}
            {...field}
          />
        )}
      />
    </>
  );
};

function getStepContent(step, isValidEmailState, isValidPasswordState, isValidRePasswordState) {
  switch (step) {
    case 0:
      return <AccountForm isValidEmailState={isValidEmailState} isValidPasswordState={isValidPasswordState} isValidRePasswordState={isValidRePasswordState}/>;

    case 1:
      return <PersonalForm />;
    case 2:
      return <AddressForm />;
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
      name: "",
      address: "",
      dob: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [isValidEmailState, setIsValidEmailState] = useState(null);
  const [isValidPasswordState, setIsValidPasswordState] = useState(null);
  const [isValidRePasswordState, setIsValidRePasswordState] = useState(null);
  const steps = getSteps();
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  const sendData = async (data) => {
    await axiosInstance.post("/auth/register", data).then((res) => {
      console.log(res);
    });
  };

  const handleNext = (data) => {
    
    let _data = {
      email: data.email,
      name: data.name,
      password: data.password,
      phone: data.phoneNumber,
      address: data.address,
      role: "user",
      dob: data.dob,
    };
    if (activeStep == steps.length - 1) {
      //sendData(_data);
      console.log(_data);
      setActiveStep(activeStep + 1);
    } else {
      if(activeStep == 0){
        if(isValidEmail(_data.email)===true){
          setIsValidEmailState(true);
          setActiveStep(activeStep + 1);
        }
        else{
          setIsValidEmailState(false);
          return;
        }
      }
      setActiveStep(activeStep + 1);
      
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
          <Alert
            severity="success"
            style={{
              width: "400px",
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <strong>Success</strong> — check it out!
          </Alert>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: "30px",
            }}
          >
            <h3 style={{ color: "#1d1d1f" }}>Enjoy Your Food</h3>{" "}
            <img
              src={congratulaion}
              alt="congratulaion"
              style={{ width: "80px", height: "80px", marginTop: "-5%" }}
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
            <form
              onSubmit={methods.handleSubmit(handleNext)}
              style={{ position: "relative", width: "100%" }}
            >
              {getStepContent(activeStep, isValidEmailState, isValidPasswordState, isValidRePasswordState)}
              <div className="button_container">
              <input
                type="button"
                value="Back"
                onClick={handleBack}
                className="back_button"
                disabled={activeStep === 0 ? true : false}
                style={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  opacity: activeStep === 0 ? "0" : "1",
                  zIndex: activeStep === 0 ? "-1" : "1",
                  cursor: activeStep === 0 ? "default" : "pointer",
                  marginRight: activeStep === 0 ? "0" : "3%",
                }}
              />
              <input
                type="submit"
                value={activeStep === steps.length - 1 ? "Finish" : "Next"}
                className="next_button"
                style={{
                  backgroundColor: "#FF003D",
                  color: "#f5f5f7",
                  marginLeft: activeStep === 0 ? "-13%" : "3%",
                }}
              />
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;
