import styled from 'styled-components';

export const Wrapper = styled.main`
    ${({theme}) => theme.typography};
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    padding: ${({theme}) => theme.text.size.items.appPadding}px;
    gap: ${({theme}) => theme.text.size.items.appPadding}px;
    display: flex;
    flex-direction: column;
    background-image: ${({theme}) => theme.colors.bg.bgGradient};
    color: ${({theme}) => theme.colors.text.textPrimary};

    .errorContainer {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.text.size.items.appPadding}px;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
`;