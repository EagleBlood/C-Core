import "./styles/theme.css";
import "./styles/variables.css"
import "./App.css";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";

export default function App() {

  return (
    <div>
      <Header/>
      <div className="content">
        <Menu/>
        <Menu/>
      </div>
      
    </div>
  );
}
