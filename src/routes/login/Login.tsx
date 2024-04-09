import React, { useState, FunctionComponent } from "react";
import { LogoBig } from "../../assets/LogoBig";
import { LoginProps } from "./login.props";
import { Wrapper } from './login.style';

const Login: FunctionComponent<LoginProps> = ({ }) => { 
  return (
    <Wrapper>
      <div className="loginBar">
        <div className="logoContainer">
          <LogoBig/>
          <h1><span>C - Core</span></h1>
        </div>
        
        <div className="loginMenu">
            <h1>Sign In . . .</h1>
            <div className="inputItemContainer">
                <p>Email Address *</p>
                <input type="text" placeholder="Email Address"/>
            </div>
            
            <div className="inputItemContainer">
                <p>Password *</p>
                <input type="password" placeholder="Password"/>
                <p className="smallTextForgotPass">Forgot Password?</p>
            </div>

            <div className="loginContainer">
                <button><h2>Login</h2></button>
                <p className="smallText">Don’t have an account yet? <span className="specialText">Sign Up</span> now!</p>
            </div>

        </div>
        <p className="smallText">Powered by <span className="specialText">Vite</span></p>
      </div>
    </Wrapper>
  );
};

export default Login;