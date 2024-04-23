import styled from 'styled-components';

export const Wrapper = styled.main`
    ${({theme}) => theme.typography};
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    gap: ${({theme}) => theme.values.size.items.largeGap}px;
    display: flex;
    flex-direction: row;
    background-image: ${({theme}) => theme.colors.bg.bgGradient};
    color: ${({theme}) => theme.colors.text.textSecondary};
    overflow: hidden;
    
    .loginBar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        background-color: ${({theme}) => theme.colors.bg.bgSecondary};
        border-radius: 0px ${({theme}) => theme.values.size.items.radiusLarge}px ${({theme}) => theme.values.size.items.radiusLarge}px 0px;
        width: 30%;
        padding: ${({theme}) => theme.values.size.items.appPadding}px;
        box-sizing: border-box;
        min-width: 300px;
    }

    .render {
        display: flex;
        flex-direction: column;
        justify-content: center;

        height: 100%;
        width: 100%;
    }

    .logoContainer {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .logoContainer span {
        font-weight: normal;
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
        cursor: pointer;
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
        transition: background-color  ${({theme}) => theme.values.time.slow}s;
        width: 100%;
    }

    button:hover {
        background-color: ${({theme}) => theme.colors.bg.bgPrimary};
    }

    input {
        color: ${({theme}) => theme.colors.text.textSpecial};
        &::placeholder {
          color: ${({theme}) => theme.colors.text.textSpecial};
        }
    }

    .fade-in {
        animation: fadeIn 5s;
        display: flex;
        flex-grow: 1;
        
    }
      
    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
`;