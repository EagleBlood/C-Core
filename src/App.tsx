import Home from "./routes/home/Home";
import './App.css';
import { AppProps } from "./App.props";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./interfaces/JwtPayloadContext";

const App: React.FC<AppProps> = ({ toggleTheme }) => {
  const [socket, setSocket] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/acc/login');
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
  
      if (decoded && typeof decoded === 'object' && 'exp' in decoded) {
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decoded.exp < currentTime) {
          // Token is expired
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    }
  }, []);

  useEffect(() => {
    let socket;
  
    try {
      socket = io('http://localhost:3100');
    } catch (error) {
      alert('Server connection failed');
      return;
    }
  
    socket.on('connect', () => {
      console.log(`Connected with ID ${socket.id}`);
    });
  
    socket.on('disconnect', () => {
      console.log(`Disconnected`);
    });
  
    socket.on('connect_error', () => {
      alert('Server connection failed');
    });
  
    socket.on('error', (error) => {
      console.log('error:', error);
    });
  
    //@ts-ignore
    setSocket(socket);
  }, []);
  
  /*TODO

  /*TODO 22.04.2024
    x Fix the home vertial scrool as it is now bugged cuz of motion.div (probably missing block.size = border-box)
    x Fix chart rerender on theme change
    x Fix on popup menu and everhting inside homeContainer to go up from bottom
    x Fix color change of text of selected item in Menu when confirming adding the new device
    x Add animation on popup menu
    x Add animation on Menu item Outlet redner
    x Add when hovered on Logout in (Menu.tsx) text will be slighty bigger
    x Adjust animation switch between routes screens
    x Adjust the addDevice popup elements
    -* Adjust Account route animations (Login.tsx) to be slower and smother

    // 10.05.2024
    x Add to load devices from api into dashboard
    - Add ability to add new devices from dashboard
    - Add ability to remove devices from dashboard
    x Add cancel button from adding new device popup
    x Add live data to main 4 controls in dashboard
    x Add live data to all devices in dashboard
    x Add user accounts into api
    x Add auth from api users to app
    -* Add ability to change user password
    -* Add user permissions weights

    x Redo device details after one is chosen from device list

    //26.05.2024
    - Websockets doesn't work for now as it is closing on start, works from client -> server using those commands:
    let ws = new WebSocket('ws://localhost:3100');
    const data = {
        temperature: 28.8,
        pressure: 992.9,
        humidity: 30
    };

    ws.send(JSON.stringify(data));
  */

    /* TODO 24.04.2024
    - List in menu
    - ScrollView in menu
    - Devices in Dashboard as an Outlet for menu item render
    - Label of picked menu item 
    - In Intro add text about
    - Unify colors of buttons
    - Style dropdown lists (ManageUser.tsx)
    -* Acc password reset
    -* Button to hide menu
    */

  return (
    <div>
      <Home toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;