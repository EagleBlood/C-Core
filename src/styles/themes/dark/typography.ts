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
`;
export default typography;