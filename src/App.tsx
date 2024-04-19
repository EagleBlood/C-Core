import Home from "./routes/home/Home";
import './App.css';
import { AppProps } from "./App.props";

const App: React.FC<AppProps> = ({ toggleTheme }) => {


  return (
    <div>
      <Home toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;