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

        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for Firefox */
        scrollbar-width: none;
    }

    .userContainer {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: ${({theme}) => theme.values.size.items.mediumGap}px;
    }
    
    .userBox {
        display: flex;
        justify-content: left;
        align-items: center;
        border-radius: ${({theme}) => theme.values.size.items.radiusNormal}px;
        aspect-ratio: 2 / 1;
        background-color: ${({theme}) => theme.colors.bg.bgSecondary};
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
        gap: ${({theme}) => theme.values.size.items.mediumGap}px;
    }

    .itemSelected svg path {
        fill: ${({theme}) => theme.colors.bg.bgSpecial};
    }

    h1 {
        color: ${({theme}) => theme.colors.text.textSecondary};
    }

    p {
        color: ${({theme}) => theme.colors.text.textSecondary};
    }

    .specialText {
        color: ${({theme}) => theme.colors.text.textSpecial};
    }

`;