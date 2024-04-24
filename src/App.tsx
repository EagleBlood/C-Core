import Home from "./routes/home/Home";
import './App.css';
import { AppProps } from "./App.props";

const App: React.FC<AppProps> = ({ toggleTheme }) => {

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