import { FunctionComponent, useState } from "react";
import { RegisterProps } from "./register.props";
import { Wrapper } from './register.style';
import { PhLock } from "../../assets/PhLock";
import { PhEye } from "../../assets/PhEye";
import { PhEyeSlash } from "../../assets/PhEyeSlash";
import { PhEmail } from "../../assets/PhEmail";
import { PhUserBold } from "../../assets/PhUserBold";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Register: FunctionComponent<RegisterProps> = ({ }) => { 
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const response = await fetch('http://localhost:3100/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, name, email, password }),
    });
  
    if (response.ok) {
      navigate('/acc/login');
    } else {
      const { error } = await response.json();
      alert(error);
    }
  };
  
  return (
    <Wrapper>
      <div className="loginMenu">
        <h1>Sign Up <span className="dots"></span></h1>

        <div className="inputItemContainer">
          <p>Login <span>*</span></p>
          <div className="inputField">
            <PhUserBold/>
            <input type="text" placeholder="Login" onChange={(e) => setLogin(e.target.value)}/>
          </div> 
        </div>

        <div className="inputItemContainer">
          <p>Username <span>*</span></p>
          <div className="inputField">
            <PhUserBold/>
            <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)}/>
          </div> 
        </div>

        <div className="inputItemContainer">
          <p>Email Address <span>*</span></p>
          <div className="inputField">
            <PhEmail/>
            <input type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
          </div>    
        </div>
                
        <div className="inputItemContainer" style={{position: 'relative'}}>
          <p>Password <span>*</span></p>
          <div className="inputField">
            <PhLock/>
            <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/> 
            <button onClick={togglePasswordVisibility} className={'iconButton'}>
              {showPassword ? <PhEyeSlash /> : <PhEye />}
            </button>
          </div>
        </div>

        <div className="inputItemContainer">
          <p>Confirm Password <span>*</span></p>
          <div className="inputField">
            <PhLock/>
            <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button onClick={togglePasswordVisibility} className={'iconButton'}>
              {showPassword ? <PhEyeSlash /> : <PhEye />}
            </button>
          </div>
        </div>

        <div className="loginContainer">
          <button onClick={registerUser}><h2>Register</h2></button>
          <p className="smallText">Already got an account? <Link to='/acc/login'><span className="specialText">Sign In</span></Link> now!</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;