import styled from 'styled-components';

export const Wrapper = styled.main`
    ${({theme}) => theme.typography};
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    gap: ${({theme}) => theme.values.size.items.appPadding}px;
    display: flex;
    flex-direction: column;
    background-image: ${({theme}) => theme.colors.bg.bgGradient};
    color: ${({theme}) => theme.colors.text.textSecondary};

    .loginBar {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: ${({theme}) => theme.values.size.items.appPadding}px;
        background-color: ${({theme}) => theme.colors.bg.bgSecondary};
        border-radius: ${({theme}) => theme.values.size.items.borderRadius}px;
        width: 50%;
    }
`;