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
        transition: background-color 0.3s;
        width: 100%;
    }

    input {
        color: ${({theme}) => theme.colors.text.textSpecial};
        &::placeholder {
          color: ${({theme}) => theme.colors.text.textSpecial};
        }
      }
`;