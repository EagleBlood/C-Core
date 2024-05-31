import styled from 'styled-components';

export const Wrapper = styled.main`
    display: flex;
    box-sizing: border-box;
    padding-bottom: ${({theme}) => theme.values.size.items.appPadding}px;


    // Tree.tsx styles

    .row {

        gap: ${({theme}) => theme.values.size.items.itemPaddingSmall}px;
        padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
        text-align: right;
    }

    .listContainer {
        width: 100%;
    }

    //


    .menuContainer {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        min-width: 250px;
        border-radius: ${({theme}) => theme.values.size.items.radiusNormal}px;
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
        color: ${({theme}) => theme.colors.text.textPrimary};
        gap: ${({theme}) => theme.values.size.items.itemPaddingSmall}px;
        align-items: center;
        transition: background-color ${({theme}) => theme.values.time.slow}s;
        border: 1px solid ${({theme}) => theme.colors.bg.bgStroke};
    }

    .item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: ${({theme}) => theme.values.size.items.itemPaddingSmall}px;
        align-items: center;
        cursor: pointer;
        padding: ${({theme}) => `${theme.values.size.items.buttonPadding[0]}px ${theme.values.size.items.buttonPadding[1]}px`};
        border-radius: ${({theme}) => theme.values.size.items.radiusSmall}px;
        width: 100%;
        box-sizing: border-box;
        transition: background-color ${({theme}) => theme.values.time.slow}s;
    }

    .item:hover {
        background-color: ${({theme}) => theme.colors.bg.bgThird};
        border-radius: ${({theme}) => theme.values.size.items.radiusSmall}px;
        color: ${({theme}) => theme.colors.text.textPrimary};
        transition: background-color ${({theme}) => theme.values.time.slow}s;
    }

    .item:hover svg path {
        fill: ${({theme}) => theme.colors.text.textPrimary};
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

`;