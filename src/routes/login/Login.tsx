import React, { useState, FunctionComponent } from "react";

import { LoginProps } from "./login.props";
import { Wrapper } from './login.style';

const Login: FunctionComponent<LoginProps> = ({ }) => { 
  return (
    <Wrapper>
      <div className="loginBar">
        <p>Logo</p>
        <div>
            <h1>Sign In . . .</h1>
            <div className="inputEmailContainer">
                <p>Email Address *</p>
                <input type="text" placeholder="Email Address"/>
            </div>
            
            <div className="inputPasswordContainer">
                <p>Password *</p>
                <input type="password" placeholder="Password"/>
                <p>Forgot Password?</p>
            </div>

            <div className="loginContainer">
                <button>Login</button>
                <p>Don’t have an account yet? Sign Up now!</p>
            </div>

        </div>
        <p>Powered by Vite</p>
      </div>
    </Wrapper>
  );
};

export default Login;