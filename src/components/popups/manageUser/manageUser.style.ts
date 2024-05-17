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
        background-color: ${({theme}) => theme.colors.bg.bgThird};
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

    .col {
        gap: ${({theme}) => theme.values.size.items.smallGap}px;
        justify-content: left;

    }

    .radiocontent {
        display: flex;
        flex-flow: column nowrap;
        padding: ${({theme}) => theme.values.size.items.buttonPadding[0]}px;
        gap: ${({theme}) => theme.values.size.items.smallGap}px;
        border: 1px solid ${({theme}) => theme.colors.bg.bgSecondary};
        border-radius: 0px 0px ${({theme}) => theme.values.size.items.radiusSmall}px ${({theme}) => theme.values.size.items.radiusSmall}px;
        background-color: ${({theme}) => theme.colors.bg.bgPrimary};
    }

    input[type="radio"] {
        appearance: none;
        margin: 0;
        font: inherit;
        width: 1em;
        height: 1em;
        border: 0.1em solid ${({theme}) => theme.colors.bg.bgSecondary};
        border-radius: 50%;
      }
      
      input[type='radio']:before {
        display: block;
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
      
      input[type='radio']:checked {
        border-color: ${({theme}) => theme.colors.bg.bgSpecial};
      }
      
      input[type='radio']:checked:before {
        background: ${({theme}) => theme.colors.bg.bgSpecial};
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 1;
      }


    

`;