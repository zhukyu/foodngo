import React from "react";
import { Link } from "react-router-dom";
import LinearStepper from "../components/LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@mui/material";
import "../css/SignUp.scss";
import logo from "../image/FoodnGo_logo.png";
import signup_left from "../image/signup_left.jpg";
import signup_right from "../image/signup_right.jpg";

function SignUp() {
  return (
    <div className="signup">
      <CssBaseline />
      <div className="header_signup">
        <Link to="/login">
          <h4>
            <i class="fa-solid fa-arrow-left">&nbsp;</i>Back to login
          </h4>
        </Link>
        <Link to="/">
          <img src={logo} className="logo_img" alt="logo" />
        </Link>
      </div>
      <img
        src={signup_left}
        alt="signup_left"
        className="img_left"
        style={{ width: "27.5%", height: "100vh" }}
      />
      <Paper
        style={{
          width: "45%",
          height: "75vh",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          backgroundColor: "#f5f5f7",
          borderRadius: "10px",
        }}
        className="paper_form"
      >
        <LinearStepper />
      </Paper>
      <img
        src={signup_right}
        alt="signup_right"
        className="img_right"
        style={{ width: "27.5%", height: "100vh" }}
      />
    </div>
  );
}

export default SignUp;
