import { css } from 'styled-components';
import values from './values';

const { font, size } = values;

const typography = css`
  font-family: ${font.body};
  h1 {
    font-size: ${size.text.large}px;
    margin-top: 0;
    margin-bottom: 0;
  }
  
  h2 {
    font-size: ${size.text.medium}px;
    margin-top: 0;
    margin-bottom: 0;
  }

  p {
    font-size: ${size.text.medium}px;
    margin-top: 0;
    margin-bottom: 0;
  }

  button {
    font-size: ${size.text.medium}px;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text.textPrimary};
    padding: 0;
    display: flex;
    cursor: pointer;
  }

  input {
    background-color: transparent;
    border: transparent;
    color: ${({theme}) => theme.colors.text.textSecondary};
    font-weight: bold;
    font-size: ${({theme}) => theme.values.size.text.medium}px;
    font-family: 'consolas';
    outline: none;
    width: 100%;
  }

  .inputField {
    border: 1px solid ${({theme}) => theme.colors.bg.bgPrimary};
    border-radius: ${({theme}) => theme.values.size.items.radiusSmall}px;
    padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
    display: flex;
    align-items: center;
    gap: ${({theme}) => theme.values.size.items.smallGap}px;
  }

  span {
    display: inline-block;
  }

  span::first-letter {
      color: ${({theme}) => theme.colors.text.textSpecial};
  }
`;
export default typography;