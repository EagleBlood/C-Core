import styled, { css } from 'styled-components';
import { IntroProps } from './intro.props';

const generateStarStyles = (numberOfStars: number) => {
    let styles = '';
    for (let i = 1; i <= numberOfStars; i++) {
      const size = Math.floor(Math.random() * 5) + 2;
      styles += `
        .star-${i} {
          top: ${Math.random() * 100 }%;
          left: ${Math.random() * 100 }%;
          width: ${size}px;
          height: ${size}px;
          animation: ${Math.random() * 2}s flicker ${Math.random() * 2}s infinite;
        }
      `;
    }
    return css`${styles}`;
  }

export const Wrapper = styled.main<IntroProps>`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  position: relative;

  ${({ numberOfStars }) => generateStarStyles(numberOfStars)}

  .introContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .introContainer h1 {
    color: ${({theme}) => theme.colors.text.textPrimary};
  }

  .stars {
    position: absolute;
    border-radius: 10px;
    overflow: hidden;
    background: ${({theme}) => theme.colors.bg.bgSecondary};
  }
`;