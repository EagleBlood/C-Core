import React, { FunctionComponent } from "react";
import { LoginProps } from "./login.props";
import { Wrapper } from './login.style';
import { PhLock } from "../../assets/PhLock";
import { PhEye } from "../../assets/PhEye";
import { PhEyeSlash } from "../../assets/PhEyeSlash";
import { PhEmail } from "../../assets/PhEmail";

const Login: FunctionComponent<LoginProps> = ({ }) => { 
  return (
    <Wrapper>
      <div className="loginMenu">
        <h1>Sign In . . .</h1>
        <div className="inputItemContainer">
            <p>Email Address *</p>
            <div className="inputField">
              <PhEmail/>
              <input type="text" placeholder="Email Address"/>
            </div> 
        </div>
        
        <div className="inputItemContainer">
            <p>Password *</p>
            <div className="inputField">
              <PhLock/>
              <input type="password" placeholder="Password"/> 
              <PhEye/>
            </div>
            <p className="smallTextForgotPass">Forgot Password?</p>
        </div>

        <div className="loginContainer">
            <button><h2>Login</h2></button>
            <p className="smallText">Don’t have an account yet? <span className="specialText">Sign Up</span> now!</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;