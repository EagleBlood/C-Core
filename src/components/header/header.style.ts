import styled from 'styled-components';

export const Wrapper = styled.main`
${({theme}) => theme.typography};
height: 100vh;
width: 100%;
padding: 60px;
background-image: ${({theme}) => theme.colors.bg.bgGradient};
color: ${({theme}) => theme.colors.text.textprimary};
`;