import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
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
import { DatePicker, message, AutoComplete, Select,Spin, notification } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

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
import congratulaion from "../image/congratulation.gif";
import axiosInstance from "../utility/AxiosInstance";
import Swal from "sweetalert2";
const useStyles = makeStyles(() => ({
  button: {},
  input: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

function getSteps() {
  return [
    "Account Registration",
    "Personal Information",
    "Address Information",
  ];
}
const AccountForm = (props) => {
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
            error={props.isValidEmailState === false ? true : false}
            helperText={
              props.isValidEmailState === false ? "Invalid Email" : ""
            }
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
              error={props.isValidPasswordState === false ? true : false}
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
              error={props.isValidPasswordState === false ? true : false}
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
            {props.isValidPasswordState === false ? (
              <FormHelperText error id="accountId-error">
                Password must be at least 8 characters long
              </FormHelperText>
            ) : (
              ""
            )}
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
              error={props.isValidPasswordState === false ? true : false}
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
              error={props.isValidPasswordState === false ? true : false}
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
            {props.isValidRePasswordState === false ? (
              <FormHelperText error id="accountId-error">
                Re-Password doesn't match
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        )}
      />
    </>
  );
};
const AddressForm = () => {
  const { control } = useFormContext();
  const [addressInput, setAddressInput] = useState({});
  const [placeId, setPlaceId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [addressMap, setAddressMap] = useState([]);
  let prevAddress = null;
  let currentAddress = "";
  let prevPlaceId = null;
  let currentPlaceId = "";
  let flag = null;

  const address_antd = useRef(null);
  const handleChange = (value) => {
    localStorage.setItem("genderValue", JSON.stringify(value));
  };

  const onLocationSelect = (value) => {
    const suggestion = addressMap.find(
      (suggestion) => suggestion.description === value
    );
    localStorage.setItem("addressObject", JSON.stringify(suggestion));
    console.log(suggestion);
    if (suggestion.place_id !== prevPlaceId) {
      setPlaceId(suggestion.place_id);
      prevPlaceId = suggestion.place_id;
      currentPlaceId = suggestion.place_id;
      prevAddress = suggestion.description;
      currentAddress = suggestion.description;
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      await axiosInstance.get(`/map/geocode?placeId=${placeId}`).then((res) => {
        if (res.status === 200) {
          const location = res.data.geoCode.results[0].geometry.location;
          console.log(location);
          const coordinate = [location.lng, location.lat];
          const tmplocation = { coordinates: coordinate };
          localStorage.setItem("locationObject", JSON.stringify(tmplocation));
        }
      });
    };
    if (placeId !== "") {
      fetchCoordinates();
    }
  }, [placeId]);

  useEffect(() => {
    setPlaceId("");
    setSuggestions([]);

    if (addressInput.length === 0) {
      setSuggestions([]);
    }

    const fetchSuggestions = async () => {
      await axiosInstance
        .get(`/map/search?address=${addressInput}`)
        .then((res) => {
          if (res.status === 200) {
            const addressList = res.data.predictions.predictions;
            setAddressMap(addressList);
            const suggestions = addressList.map((suggestion, index) => ({
              value: suggestion.description,
              id: suggestion.place_id,
              index: index,
            }));
            console.log(suggestions);
            setSuggestions(suggestions);
          }
        });
    };

    const timer = setTimeout(() => {
      if (addressInput.length > 0) {
        fetchSuggestions();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [addressInput]);
  return (
    <>
      <Controller
        control={control}
        name="gender"
        render={({ field, fieldState }) => (
          <Select
            style={{
              width: 120,
            }}
            className="gender_picker"
            onChange={handleChange}
            placeholder="Gender"
            size="large"
            options={[
              {
                value: "male",
                label: "male",
              },
              {
                value: "female",
                label: "female",
              },
            ]}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        rules={{ required: "Address is required" }}
        render={({ field, fieldState }) => (
          <AutoComplete
            className="user_input"
            placeholder="Enter Your Address"
            options={suggestions}
            onSelect={onLocationSelect}
            onChange={(value) => {
              setAddressInput(value);
              currentAddress = value;
            }}
            onBlur={() => {
              if (
                currentAddress !== prevAddress &&
                (currentPlaceId === prevPlaceId || prevPlaceId === null)
              )
                flag = false;
            }}
            ref={address_antd}
            size="large"
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
        rules={{ required: "Name is required" }}
        render={({ field, fieldState }) => (
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            placeholder="Enter Your Name"
            fullWidth
            margin="normal"
            color="error"
            error={fieldState.error ? true : false}
            helperText={fieldState.error ? "Name is required" : ""}
            onClick={() => {
              setIsFocused(false);
            }}
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
        rules={{ required: "Date of birth is required" }}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              id="dob"
              size="large"
              status={fieldState.error ? "error" : undefined}
              className={isFocused === true ? "focused" : "date_picker"}
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
              {...field}
            />
            <br />
            {fieldState.error ? (
              <span style={{ fontSize: "12.25px" }} className="dob_msg">
                {fieldState.error?.message}
              </span>
            ) : null}
          </>
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        rules={{ required: "Phone number is required" }}
        render={({ field, fieldState }) => (
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
            error={fieldState.error ? true : false}
            helperText={fieldState.error ? "Phone number is required" : ""}
            style={{ width: "70%", marginLeft: "15%" }}
            onClick={() => {
              setIsFocused(false);
            }}
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

function getStepContent(
  step,
  isValidEmailState,
  isValidPasswordState,
  isValidRePasswordState,
  isEmptyAddressState,
  isEmptyNameState,
  isEmptyPhoneState
) {
  switch (step) {
    case 0:
      return (
        <AccountForm
          isValidEmailState={isValidEmailState}
          isValidPasswordState={isValidPasswordState}
          isValidRePasswordState={isValidRePasswordState}
        />
      );

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
      gender: "",
      name: "",
      address: {},
      dob: "",
      location: {
        coordinates: [0, 0],
      },
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [isValidEmailState, setIsValidEmailState] = useState(null);
  const [isValidPasswordState, setIsValidPasswordState] = useState(null);
  const [isValidRePasswordState, setIsValidRePasswordState] = useState(null);
  const [addressObject, setAddressObject] = useState({});
  const [genderObject, setGenderObject] = useState("");
  const [locationObject, setLocationObject] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = getSteps();

  const [showNotification, setShowNotification] = useState(null);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
        color: "#FF003D",
        marginTop:"12%"
      }}
      spin
    />
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) return true;
    else return false;
  }

  function validatePassword(password) {
    if (password.length === 6) {
      return true; // Password is valid
    } else {
      return false; // Password is not valid
    }
  }

  const sendData = async (data) => {
    await axiosInstance
      .post("/auth/register/user", data)
      .then((res) => {
        localStorage.removeItem("addressObject");
        localStorage.removeItem("genderValue");
        localStorage.removeItem("locationObject");
        setLoading(false);
        setActiveStep(activeStep + 1);

        notification.open({
          icon: <i className="fa-solid fa-check" style={{ color: 'green' }}></i>,
          message: 'Success!',
          description: 'Account created successfully!',
          onClick: () => {
              console.log('Notification Clicked!');
          },
      });
        
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          title: "Error!",
          text:
            err.response.data.message == `"location.coordinates" is required`
              ? "Address Invalid"
              : err.response.data.message == `"gender" must be a string`
              ? "Please select gender"
              : err.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      });
    
  };

  const handleNext = (data) => {
    let _data = {
      email: data.email,
      name: data.name,
      password: data.password,
      phone: data.phoneNumber,
      address: addressObject,
      gender: genderObject,
      dob: data.dob,
      location: locationObject,
    };

    if (activeStep === 2) {
      const storedObject = localStorage.getItem("addressObject");
      const tmp = storedObject ? JSON.parse(storedObject) : {};
      _data.address = tmp;
      _data.dob = data.dob.toISOString();
      const storedGender = localStorage.getItem("genderValue");
      const tmpGender = storedGender ? JSON.parse(storedGender) : {};
      _data.gender = tmpGender;
      const storedLocation = localStorage.getItem("locationObject");
      const tmpLocation = storedLocation ? JSON.parse(storedLocation) : {};
      _data.location = tmpLocation;
      //console.log(_data);
      setLoading(true);
      sendData(_data) 
       
      
      // console.log("this is the data");
      // console.log(_data);
    }
    if (activeStep === 1) {
      setActiveStep(activeStep + 1);
    }

    if (activeStep === 0) {
      if (
        isValidEmail(_data.email) === true &&
        validatePassword(_data.password) === true &&
        _data.password === data.re_password
      ) {
        setIsValidPasswordState(true);
        setIsValidRePasswordState(true);
        setIsValidEmailState(true);
        setActiveStep(activeStep + 1);
      } else {
        if (isValidEmail(_data.email) === false) setIsValidEmailState(false);
        if (validatePassword(_data.password) === false)
          setIsValidPasswordState(false);
        if (_data.password !== data.re_password)
          setIsValidRePasswordState(false);
        setActiveStep(activeStep);
      }
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
    <Spin spinning={loading} indicator={antIcon}>
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
              {getStepContent(
                activeStep,
                isValidEmailState,
                isValidPasswordState,
                isValidRePasswordState,
                addressObject,
                setAddressObject
              )}
              <div
                className="button_container"
                style={{
                  marginTop: activeStep === 2 ? "29.25%" : "3%",
                  position: activeStep === 2 ? "absolute" : "relative",
                }}
              >
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
    </Spin>
  );
};

export default LinaerStepper;
