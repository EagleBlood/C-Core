import { FunctionComponent, useContext, useState } from "react";
import { LoginProps } from "./login.props";
import { Wrapper } from './login.style';
import { PhLock } from "../../assets/PhLock";
import { PhEye } from "../../assets/PhEye";
import { PhEyeSlash } from "../../assets/PhEyeSlash";
import { PhEmail } from "../../assets/PhEmail";
import { Link, useNavigate } from "react-router-dom";
import { useJwtPayload } from '../../interfaces/JwtPayloadContext';
import { jwtDecode } from "jwt-decode";

const Login: FunctionComponent<LoginProps> = ({ }) => { 
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const jwtPayloadContext = useJwtPayload();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:3100/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      // Save the token in local storage
      localStorage.setItem('token', data.token);
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        if (jwtPayloadContext) {
          if ('userId' in decoded && 'name' in decoded && 'exp' in decoded) {
            jwtPayloadContext.setDecoded({
              ...decoded,
              userId: decoded.userId as string,
              name: decoded.name as string,
              exp: decoded.exp as number,
            });
          } else {
            console.error('Decoded token does not contain required properties');
          }
        } else {
          console.error('jwtPayloadContext is null');
        }
      }
      navigate('/home');
    } else {
      // Handle error
      console.error('Failed to authenticate');
      alert('Login failed. Please check your login and password.');
    }
  };

  return (
    <Wrapper>
      <div className="loginMenu">
        <h1>Sign In <span className="dots"></span></h1>
        <div className="inputItemContainer">
            <p>Email Address *</p>
            <div className="inputField">
              <PhEmail/>
              <input 
                type="text" 
                placeholder="Email Address"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div> 
        </div>
        
        <div className="inputItemContainer">
          <p>Password *</p>
          <div className="inputField">
            <PhLock/>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> 
            <button onClick={togglePasswordVisibility} className={'iconButton'}>
              {showPassword ? <PhEyeSlash /> : <PhEye />}
            </button>
          </div>
          <p className="smallTextForgotPass">Forgot Password?</p>
        </div>

        <div className="loginContainer">
            <button onClick={handleSubmit}><h2>Login</h2></button>
            <p className="smallText">Don’t have an account yet? <Link to='/acc/register'><span className="specialText">Sign Up</span></Link> now!</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;