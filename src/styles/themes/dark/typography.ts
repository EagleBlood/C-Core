import { css } from 'styled-components';
import text from './text';

const { font, size } = text;

const typography = css`
  font-family: ${font.body};
  h1 {
    font-size: ${size.body.large}px;
  }
  h2 {
    font-size: ${size.body.medium}px;
  }
  p {
    font-size: ${size.body.small}px;
  }
`;
export default typography;