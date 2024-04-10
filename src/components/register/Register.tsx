import React, { FunctionComponent } from "react";
import { RegisterProps } from "./register.props";
import { Wrapper } from './register.style';
import { PhLock } from "../../assets/PhLock";
import { PhEye } from "../../assets/PhEye";
import { PhEyeSlash } from "../../assets/PhEyeSlash";
import { PhEmail } from "../../assets/PhEmail";
import { PhUserBold } from "../../assets/PhUserBold";
import { Link } from "react-router-dom";

const Register: FunctionComponent<RegisterProps> = ({ }) => { 
  return (
    <Wrapper>
      <div className="loginMenu">
        <h1>Sign Up . . .</h1>
        <div className="inputItemContainer">
            <p>Username <span>*</span></p>
            <div className="inputField">
              <PhUserBold/>
              <input type="text" placeholder="Username"/>
            </div> 
        </div>

        <div className="inputItemContainer">
            <p>Email Address <span>*</span></p>
            <div className="inputField">
              <PhEmail/>
              <input type="text" placeholder="Email Address"/>
            </div>    
        </div>
        
        <div className="inputItemContainer" style={{position: 'relative'}}>
          <p>Password <span>*</span></p>
            <div className="inputField">
              <PhLock/>
              <input type="password" placeholder="Password"/> 
              <PhEye/>
            </div>
        </div>

        <div className="inputItemContainer">
            <p>Confirm Password <span>*</span></p>
            <div className="inputField">
              <PhLock/>
                <input type="password" placeholder="Confirm Password"/>
              <PhEye/>
            </div>
        </div>

        <div className="loginContainer">
            <Link to='/'><button><h2>Register</h2></button></Link>
            <p className="smallText">Already got an account? <Link to='/acc/login'><span className="specialText">Sign In</span></Link> now!</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;