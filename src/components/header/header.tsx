import React, { useContext } from "react";
import "./header.css";
import { ThemeContext } from "../../Theme";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header-container">
      <div className="header-toggle-buttons">
        <button onClick={() => toggleTheme()}>{theme}</button>
      </div>
    </div>
  );
};

export default Header;
