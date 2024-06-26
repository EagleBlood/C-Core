import styled from 'styled-components';

export const Wrapper = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;

    .scrollContainer {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.mediumGap}px;
        width: 100%;
        max-height: 100vh;
        overflow-y: auto;
        padding-bottom: ${({theme}) => theme.values.size.items.appPadding}px;

        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for Firefox */
        scrollbar-width: none;
    }

    .userContainer {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: ${({theme}) => theme.values.size.items.mediumGap}px;
    }
    
    .userBox {
        display: flex;
        justify-content: left;
        align-items: center;
        border-radius: ${({theme}) => theme.values.size.items.radiusNormal}px;
        aspect-ratio: 2 / 1;
        background-color: ${({theme}) => theme.colors.bg.bgThird};
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
        gap: ${({theme}) => theme.values.size.items.mediumGap}px;
        transition: background-color ${({theme}) => theme.values.time.slow}s;
    }

    .userBox:hover svg path {
        fill: ${({theme}) => theme.colors.bg.bgSpecial};
        transition: fill ${({theme}) => theme.values.time.fast}s;
    }

    .userBox:hover h1 {
        color: ${({theme}) => theme.colors.bg.bgSpecial};
        transition: color ${({theme}) => theme.values.time.fast}s;
    }


    .itemSelected svg path {
        fill: ${({theme}) => theme.colors.bg.bgSpecial};
    }

    h1 {
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    p {
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    .specialText {
        color: ${({theme}) => theme.colors.text.textSpecial};
    }

`;