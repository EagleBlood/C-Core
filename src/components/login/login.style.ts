import styled from 'styled-components';

export const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .loginMenu {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.smallGap}px;
        justify-content: center;
        width: 100%;
        max-width: 500px;
    }
    

    .loginContainer {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.miniGap}px;
        padding: 35px 0px;
    }

    .inputItemContainer {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.miniGap}px;
    }

    .smallTextForgotPass {
        font-size: ${({theme}) => theme.values.size.text.small}px;
        width: 100%;
        text-align: right;
    }

    .smallText {
        font-size: ${({theme}) => theme.values.size.text.small}px;
        width: 100%;
        text-align: center;
    }

    .specialText {
        color: ${({theme}) => theme.colors.text.textSpecial};
        font-weight: bold;
        cursor: pointer;
    }

    button {
        display: flex;
        justify-content: center;
        background-color: ${({theme}) => theme.colors.bg.bgSpecial};
        color: ${({theme}) => theme.colors.text.textPrimary};
        border-radius: ${({theme}) => theme.values.size.items.radiusSmall}px;
        padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
    }

    button:hover {
        background-color: ${({theme}) => theme.colors.bg.bgPrimary};
    }

    input {
        color: ${({theme}) => theme.colors.text.textSecondary};
        &::placeholder {
          color: ${({theme}) => theme.colors.text.textSpecial};
        }
    }

    @keyframes dots {
        0%, 20% { content: ''; }
        25%, 45% { content: '.'; }
        50%, 70% { content: '. .'; }
        75%, 95% { content: '. . .'; }
        100% { content: ''; }
    }
    
    .dots::after {
        content: '';
        display: inline-block;
        animation: dots 4s steps(1, end) infinite;
    }
`;