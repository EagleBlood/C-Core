import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { DefaultTheme } from 'styled-components';

interface PhDotProps {
    onClick?: () => void;
  }

export const PhDot: React.FC<PhDotProps> = ({ onClick }) => {
  const themeContext = useContext<DefaultTheme | undefined>(ThemeContext);
  
  return (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="7" y="7" width="10" height="10" rx="5" fill={themeContext?.colors.bg.bgPrimary}/>
</svg>
);
}
