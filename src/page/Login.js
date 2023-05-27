import React, { useState } from "react";
import "../css/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import deliverydriver from "../image/deliveryDriver.gif";
import google from "../image/google.png";
import facebook from "../image/facebook.png";
import logo from "../image/FoodnGo_logo.png"
import axiosInstance from "../utility/AxiosInstance";
function Login() {

  const [formData, setFormData] = useState()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axiosInstance.post('/auth/login', formData)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem('access_token', res.data.accessToken);
        localStorage.setItem('refresh_token', res.data.refreshToken);
        localStorage.setItem('username', JSON.stringify(res.data.user.name));
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
        navigate('/restaurants')
      }
    })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="login_container">
        <div className="header_login">
          <Link to="/"><img src={logo} alt="logo" className="logo_img" /></Link>
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

            <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })}></input>
            <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })}></input>
            <div className="forgot_password">
              <h6>Forgot password?</h6>
            </div>
            <button className="login_button">Login</button>
            <div className="signup_link">
              <h5>Need an account?&nbsp;</h5>
              <Link to="/signup"><h4>Sign Up</h4></Link>
            </div>
          </div>
          {/* <div className="or_underline">OR</div> */}
          {/* <div className="login_with_google">
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

          </div> */}
        </div>
      </div>
    </form>
  );
}

export default Login;
