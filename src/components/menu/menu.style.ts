import styled from 'styled-components';

export const Wrapper = styled.main`
    .menuContainer {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        flex: 1;
        height: 100%;
        width: 250px;
        border-radius: ${({theme}) => theme.values.size.items.radiusNormal}px;
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
        background-color: ${({theme}) => theme.colors.bg.bgSecondary};
        color: ${({theme}) => theme.colors.text.textSecondary};
        gap: ${({theme}) => theme.values.size.items.itemPaddingSmall}px;
        align-items: center;
    }

    .item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: ${({theme}) => theme.values.size.items.itemPaddingSmall}px;
        align-items: center;
        cursor: pointer;
        padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
        width: 100%;
        box-sizing: border-box;
    }

    .itemSelected {
        justify-content: flex-start;
        padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
        background-color: ${({theme}) => theme.colors.bg.bgSpecial};
        border-radius: ${({theme}) => theme.values.size.items.radiusSmall}px;
        display: flex;
        flex-direction: row;
        gap: ${({theme}) => theme.values.size.items.itemPaddingSmall}px;
        align-items: center;
        cursor: pointer;
        width: 100%;
        box-sizing: border-box;
    }

    .itemSelected p{
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    .itemSelected svg path {
        fill: ${({theme}) => theme.colors.text.textPrimary};
    }

    .appName {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .verName {
        font-size: ${({theme}) => theme.values.size.text.small}px;
    }

    .appName span::first-letter, .verName::first-letter {
        color: ${({theme}) => theme.colors.text.textSpecial};
    }
`;