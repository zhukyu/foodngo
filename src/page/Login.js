import React from "react";
import "../css/Login.scss";
import { useParams } from "react-router-dom";
import deliverydriver from "../image/deliveryDriver.gif";
import google from "../image/google.png";
import facebook from "../image/facebook.png";
import logo from "../image/FoodnGo_logo.png"
function Login() {
  return (
    <div className="login_container">
      <div className="header_login">
        <img src={logo} alt="logo"/>
      </div>
      <div className="login_animation">
        <div className="highway"></div>
        <div className="city"></div>
        <img
          src={deliverydriver}
          alt="deliveryDriver"
          className="deliverydriver"
        ></img>
      </div>
      <div className="login_form">
        <div className="login_form_container">
          <h3>Login</h3>

          <input type="text" placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <div className="forgot_password">
            <h6>Forgot password?</h6>
          </div>
          <button className="login_button">Login</button>
          <div className="signup_link">
            <h5>Need an account?&nbsp;</h5>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
        <div className="or_underline">OR</div>
        <div className="login_with_google">
          <button className="login_with_google_button">
            Continue with Google&emsp;&emsp;&nbsp;
            <img src={google} className="google_logo"></img>
          </button>
          
        </div>
        <div className="login_with_facebook">
          <button className="login_with_facebook_button">
            Continue with Facebook&emsp;
            <img src={facebook} className="facebook_logo"></img>
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
