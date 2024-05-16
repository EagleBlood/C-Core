import styled from 'styled-components';

export const Wrapper = styled.main`
    .formContainer {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.smallGap}px;
    }
    
    input {
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    .inputField {
        color: ${({theme}) => theme.colors.text.textPrimary};
        border-color: ${({theme}) => theme.colors.bg.bgSecondary};
    }

    .inputItemContainer{
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    button {
        display: flex;
        justify-content: center;
        background-color: ${({theme}) => theme.colors.bg.bgSecondary};
        color: ${({theme}) => theme.colors.text.textPrimary};
        border-radius: ${({theme}) => theme.values.size.items.radiusSmall}px;
        padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
        cursor: pointer;
        transition: background-color ${({theme}) => theme.values.time.fast}s, color ${({theme}) => theme.values.time.fast}s;
        width: 100%;
    }

    button:hover {
        color: ${({theme}) => theme.colors.text.textPrimary};
        background-color: ${({theme}) => theme.colors.bg.bgSpecial};
    }

    h1 {
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    p {
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    .row {
        gap: ${({theme}) => theme.values.size.items.largeGap}px;
    }

`;