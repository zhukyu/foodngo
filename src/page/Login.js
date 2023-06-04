import React, { useState } from "react";
import "../css/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import deliverydriver from "../image/deliveryDriver.gif";
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
        if(!localStorage.getItem('address')) {
          localStorage.setItem('address', JSON.stringify(res.data.user.address));
        }
        if(!localStorage.getItem('coordinates')) {
          localStorage.setItem('coordinate', JSON.stringify(res.data.user.location.coordinates));
        }
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
          
          <div className="company">
          <h4 className="partners">Partners</h4>
          <div className="partners_img">
           <img src ="https://developers.momo.vn/v3/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png" alt="bk" className="momo"/>
           <img src ="https://img.freepik.com/free-icon/paypal_318-674245.jpg" alt="paypal"/>
           <img src ="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" alt="fb"/>
           <img src ="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png" alt="gg"/>
           <img src ="https://static.vecteezy.com/system/resources/previews/018/930/718/non_2x/discord-logo-discord-icon-transparent-free-png.png" alt="discord" className="discord"/>
           <img src ="https://img.freepik.com/free-icon/twitter_318-674515.jpg" alt="twitter"/>
           </div>
          </div>

            <div className="team_copyright">
              <h4 className="info"><i className="fa-regular fa-copyright"></i>&nbsp;PBL5 - Created and designed by Group I - (Ly Van Tanh - Pham Tien Huu - Nguyen Khac Thai)</h4>
            </div>
        
        </div>
      </div>
    </form>
  );
}

export default Login;
