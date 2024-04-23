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
    user-select: none;
  }

  .logoText {
    color: ${({theme}) => theme.colors.text.textPrimary};
    position: relative;
    font-size: 5em;
    transition: font-size ${({theme}) => theme.values.time.fast}s ease-in-out;
  }
  
  .logoText:hover {
    font-size: 6em;
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
    transition: background ${({theme}) => theme.values.time.slow}s ease-in-out, opacity ${({theme}) => theme.values.time.slow}s ease-in-out;
    color: ${({theme}) => theme.colors.text.textPrimary};
    min-height: 300px;
  }

  .infoBox:hover {
    background: ${({theme}) => theme.colors.bg.bgSecondary};
    color: ${({theme}) => theme.colors.text.textSecondary};
    opacity: 1 !important;
    z-index: 1;
  }

  .obj: {
    position: absolute;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .goodbyeText {
    color: ${({theme}) => theme.colors.text.textPrimary};
    position: relative;
    font-size: 5em;
    transition: font-size ${({theme}) => theme.values.time.slow}s ease-in-out;
    text-align: center;
    text-wrap: wrap;
    bottom: 15%;
  }
`;