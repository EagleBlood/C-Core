import { FunctionComponent, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { HeaderProps } from "./header.props.ts";
import { Wrapper } from './header.style.ts';
import { Logo } from '../../assets/Logo.tsx';
import { ThemeIcon } from "../../assets/ThemeIcon.tsx";
import { Link, useNavigate } from "react-router-dom";

interface JwtPayload {
  userId: string;
  name: string;
}

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme }) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('useEffect token', token);
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('decoded', decoded);
      setUserID(decoded.userId);
      setUserName(decoded.name);
    }
  }, []);

  const handleLogout = async () => {
    console.log('Clicked');
    const token = localStorage.getItem('token');
    console.log('token ', token);
    if (token && userID) {
      try {
        console.log('Try');
        const response = await fetch(`http://localhost:3100/api/user/logout/${userID}`, {
          method: 'DELETE',
          headers: {
            'x-access-token': token,
          },
        });
  
        if (response.ok) {
          localStorage.removeItem('token');
          navigate('/acc/login');
        } else {
          const data = await response.json();
          console.error('Failed to logout', data);
        }
      } catch (error) {
        console.error('Error during logout', error);
      }
    }
  };

  return (
    <Wrapper>
      <div className="bar">
        <Logo/>
        <h1 className="username">{userName}</h1>
        <button onClick={toggleTheme}><ThemeIcon /></button>
        <button onClick={handleLogout}><h2>Logout</h2></button>
      </div>
    </Wrapper>
  );
};

export default Header;