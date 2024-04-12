// intro.style.ts
import styled from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  position: relative;
  

  .introContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .introContainer h1 {
    color: ${({theme}) => theme.colors.text.textPrimary};
  }

  .logoText {
    color: ${({theme}) => theme.colors.text.textPrimary};
    position: relative;
    font-size: 5em;
    transition: font-size 0.4s ease-in-out;
  }
  
  .logoText:hover {
    font-size: 8em;
    overflow: hidden;
  }

  .stars {
    position: absolute;
    border-radius: 10px;
    overflow: hidden;
    background: ${({theme}) => theme.colors.bg.bgSecondary};
  }

  .infoBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: ${({theme}) => theme.colors.bg.bgThird};
    border-radius: ${({theme}) => theme.values.size.items.radiusLarge}px;
    padding: ${({theme}) => theme.values.size.items.boxPadding}px;
    overflow: hidden;
    transition: background 0.4s ease-in-out, color 0.4s ease-in-out, opacity 0.4s ease-in-out;
    color: ${({theme}) => theme.colors.text.textPrimary};
    min-height: 300px;
  }

  .infoBox:hover {
    background: ${({theme}) => theme.colors.bg.bgSecondary};
    color: ${({theme}) => theme.colors.text.textSecondary};
    opacity: 1 !important;
    z-index: 1;
  }

  .obj1 {
    position: absolute;
    margin-left: 75%;
    margin-top: 65%;
    rotate: 132deg;
    animation: spin 300s linear infinite;
  }

  .obj2 {
    position: absolute;
    margin-right: 30%;
    margin-bottom: 30%;
  }

  .obj3 {
    position: absolute;
    margin-right: 60%;
    margin-top: 90%;
    rotate: 60deg;
    animation: spin 21s linear infinite;
  }
  
  .obj4 {
    position: absolute;
    margin-left: 50%;
    margin-top: 70%;
    animation: spin 12s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .goodbyeText {
    color: ${({theme}) => theme.colors.text.textPrimary};
    position: relative;
    font-size: 5em;
    transition: font-size 0.4s ease-in-out;
    text-align: center;
    text-wrap: wrap;
    bottom: 15%;
  }
`;