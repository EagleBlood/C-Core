import { FunctionComponent, useState } from "react";
import { LoginProps } from "./login.props";
import { Wrapper } from './login.style';
import { PhLock } from "../../assets/PhLock";
import { PhEye } from "../../assets/PhEye";
import { PhEyeSlash } from "../../assets/PhEyeSlash";
import { PhEmail } from "../../assets/PhEmail";
import { Link } from "react-router-dom";

const Login: FunctionComponent<LoginProps> = ({ }) => { 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  return (
    <Wrapper>
      <div className="loginMenu">
        <h1>Sign In <span className="dots"></span></h1>
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
            <input type={showPassword ? "text" : "password"} placeholder="Password"/> 
            <button onClick={togglePasswordVisibility} className={'iconButton'}>
              {showPassword ? <PhEyeSlash /> : <PhEye />}
            </button>
          </div>
          <p className="smallTextForgotPass">Forgot Password?</p>
        </div>

        <div className="loginContainer">
            <Link to='/'><button><h2>Login</h2></button></Link>
            <p className="smallText">Don’t have an account yet? <Link to='/acc/register'><span className="specialText">Sign Up</span></Link> now!</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;