import Home from "./routes/home/Home";
import './App.css';
import { AppProps } from "./App.props";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App: React.FC<AppProps> = ({ toggleTheme }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/acc/login');
    }
  }, []);
  
  /*TODO
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
    - Add to load devices from api into dashboard
    - Add ability to add new devices from dashboard
    - Add ability to remove devices from dashboard
    x Add cancel button from adding new device popup
    - Add live data to main 4 controls in dashboard
    - Add live data to all devices in dashboard
    - Add user accounts into api
    - Add auth from api users to app
    -* Add ability to change user password
    -* Add user permissions weights

    - Redo device details after one is chosen from device list

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
    useEffect(() => {
      const ws = new WebSocket('ws://localhost:3100');
  
      ws.onopen = () => {
        console.log('WebSocket is connected');
      };
  
      ws.onmessage = (event) => {
        console.log('Received data: ' + event.data);
      };
  
      ws.onclose = (event) => {
        console.log('WebSocket is closed', event.reason);
      };
        
      ws.onerror = (error) => {
        console.log('WebSocket encountered an error', error);
      };
  
      return () => {
        ws.close();
      };
    }, []);
  

  return (
    <div>
      <Home toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;