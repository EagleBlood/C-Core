import { FunctionComponent, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { HeaderProps } from "./header.props.ts";
import { Wrapper } from './header.style.ts';
import { Logo } from '../../assets/Logo.tsx';
import { ThemeIcon } from "../../assets/ThemeIcon.tsx";
import { useNavigate } from "react-router-dom";
import { JwtPayload } from "../../interfaces/JwtPayloadContext.tsx";

const Header: FunctionComponent<HeaderProps> = ({ toggleTheme }) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUserID(decoded.userId);
      setUserName(decoded.name);
      console.log('decoded', decoded.userId);
    }
  }, []);

  const handleLogout = async () => {
    console.log('Clicked');
    const token = localStorage.getItem('token');
    //console.log('token ', token);
    if (token && userID) {
      try {
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
          if (response.headers.get('Content-Type')?.includes('application/json')) {
            const data = await response.json();
            console.error('Failed to logout', data);
          } else {
            const text = await response.text();
            console.error('Failed to logout', text);
          }
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