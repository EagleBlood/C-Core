import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { DefaultTheme } from 'styled-components';

export const ThemeIcon = () => {
  const themeContext = useContext<DefaultTheme | undefined>(ThemeContext);

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 2.8125C18.2323 2.8125 21.3323 4.09654 23.6179 6.38214C25.9035 8.66774 27.1875 11.7677 27.1875 15C27.1875 18.2323 25.9035 21.3323 23.6179 23.6179C21.3323 25.9035 18.2323 27.1875 15 27.1875V2.8125ZM15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0Z" fill={themeContext?.colors.text.textPrimary}/>
    </svg>
  );
}