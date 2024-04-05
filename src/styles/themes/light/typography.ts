import { css } from 'styled-components';
import text from './text';

const { font, size } = text;

const typography = css`
  font-family: ${font.body};
  h1 {
    font-size: ${size.body.large}px;
    margin-top: 0;
    margin-bottom: 0;
  }
  h2 {
    font-size: ${size.body.medium}px;
    margin-top: 0;
    margin-bottom: 0;
  }
  p {
    font-size: ${size.body.small}px;
    margin-top: 0;
    margin-bottom: 0;
  }
  button {
    font-size: ${size.body.medium}px;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text.textprimary};
    padding: 0;
    display: flex;
  }
`;
export default typography;