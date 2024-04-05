import styled from 'styled-components';

export const Wrapper = styled.main`
${({theme}) => theme.typography};
box-sizing: border-box;
height: 100vh;
width: 100%;
padding: 30px;
background-image: ${({theme}) => theme.colors.bg.bgGradient};
color: ${({theme}) => theme.colors.text.textprimary};
`;