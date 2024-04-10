import React, { useState, FunctionComponent } from "react";
import { LogoBig } from "../../assets/LogoBig";
import { AccountProps } from "./account.props";
import { Wrapper } from './account.style';
import { Outlet } from "react-router-dom";
import Login from "../../components/login/Login";

const Account: FunctionComponent<AccountProps> = ({ }) => { 
  return (
    <Wrapper>
      <div className="loginBar">
        <div className="logoContainer">
          <LogoBig/>
          <h1><span>C - Core</span></h1>
        </div>
        
        <div className="render">
          <Outlet />
        </div>

        {/*  */}
        <p className="smallText">Powered by <span className="specialText">Vite</span></p>
      </div>
    </Wrapper>
  );
};

export default Account;