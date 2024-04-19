import Home from "./routes/home/Home";
import './App.css';
import { AppProps } from "./App.props";

const App: React.FC<AppProps> = ({ toggleTheme }) => {

  /*TODO
    - Fix the home vertial scrool as it is now bugged cuz of motion.div (probably missing block.size = border-box)
    - Fix chart rerender on theme change
    - Fix on popup menu and everhting inside homeContainer to go up from bottom
    - Fix color change of text of selected item in Menu when confirming adding the new device
    - Add animation on popup menu
    - Add animation on Menu item Outlet redner
    - Add when hovered on Logout in (Menu.tsx) text will be slighty bigger
    - Adjust animation switch between routes screens
    - Adjust the addDevice popup elements
    - Adjust Account route animations (Login.tsx) to be slower and smother
  */

  return (
    <div>
      <Home toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;