import { css } from 'styled-components';
import values from './values';

const { font, size } = values;

const typography = css`
  font-family: ${font.body};

  .bg {
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    gap: ${({theme}) => theme.values.size.items.appPadding}px;
    display: flex;
    flex-direction: column;
    background-color: ${({theme}) => theme.colors.bg.bgHelper};
    transition: background-color ${({theme}) => theme.values.time.slow}s;
  }

  h1 {
    font-size: ${size.text.large}px;
    margin-top: 0;
    margin-bottom: 0;
    transition: color ${({theme}) => theme.values.time.slow}s;
  }
  
  h2 {
    font-size: ${size.text.medium}px;
    margin-top: 0;
    margin-bottom: 0;
    transition: color ${({theme}) => theme.values.time.slow}s;
  }

  p {
    font-size: ${size.text.medium}px;
    margin-top: 0;
    margin-bottom: 0;
    transition: color ${({theme}) => theme.values.time.slow}s;
  }

  svg path {
    transition: fill ${({theme}) => theme.values.time.slow}s;
  }

  button {
    font-size: ${size.text.medium}px;
    background-color: transparent;
    border: 1px solid ${({theme}) => theme.colors.bg.bgSecondary};
    border: none;
    color: ${({ theme }) => theme.colors.text.textPrimary};
    padding: 0;
    display: flex;
    cursor: pointer;
  }

  .iconButton {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 20px;
    height: 20px;
  }

  .iconButton:hover {
    background: none;
    border: none;
  }

  input {
    background-color: transparent;
    border: transparent;
    color: ${({theme}) => theme.colors.text.textPrimary};
    font-weight: bold;
    font-size: ${({theme}) => theme.values.size.text.medium}px;
    font-family: 'consolas';
    outline: none;
    width: 100%;
  }

  .inputField {
    border: 1px solid ${({theme}) => theme.colors.bg.bgSecondary};
    border-radius: ${({theme}) => theme.values.size.items.radiusSmall}px;
    padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
    display: flex;
    align-items: center;
    gap: ${({theme}) => theme.values.size.items.smallGap}px;
  }

  .inputItemContainer {
    display: flex;
    flex-direction: column;
    gap: ${({theme}) => theme.values.size.items.miniGap}px;
}

  span {
    display: inline-block;
  }

  span::first-letter {
      color: ${({theme}) => theme.colors.text.textSpecial};
  }

  a {
    text-decoration: none;
    color: ${({theme}) => theme.colors.text.textPrimary};
  }

  a:visited{
    text-decoration: none;
    color: ${({theme}) => theme.colors.text.textPrimary};
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .col {
    display: flex;
    flex-direction: column;
  }

  .popupContainer {
    background-color: ${({theme}) => theme.colors.bg.bgPopup};
    border-radius: ${({theme}) => theme.values.size.items.radiusLarge}px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: ${({theme}) => theme.values.size.items.boxPadding}px;
    position: absolute;
    width: 50%;
    min-height: 20%; /* Minimum height */
    max-height: 80%; /* Maximum height */
    overflow: auto; /* Add scroll if content is too large */
    z-index: 100;
    border: 1px solid ${({theme}) => theme.colors.bg.bgStroke};
    gap: ${({theme}) => theme.values.size.items.largeGap}px;
    
    /* Centering styles */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ul {
    margin: 0;
  }

  li {
    cursor: pointer;
    font-size: ${size.text.medium}px;
    padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
    transition: color ${({theme}) => theme.values.time.slow}s;
  }
  
`;
export default typography;