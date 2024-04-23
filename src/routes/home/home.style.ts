import styled from 'styled-components';

export const Wrapper = styled.main`
    ${({theme}) => theme.typography};
    box-sizing: border-box;
    background-color: ${({theme}) => theme.colors.bg.bgHelper};
    color: ${({theme}) => theme.colors.text.textPrimary};
    transition: background-color ${({theme}) => theme.values.time.slow}s;

    .home
    {
        box-sizing: border-box;
        height: 100vh;
        width: 100%;
        padding: ${({theme}) => theme.values.size.items.appPadding}px ${({theme}) => theme.values.size.items.appPadding}px 0px ${({theme}) => theme.values.size.items.appPadding}px;
        gap: ${({theme}) => theme.values.size.items.appPadding}px;
        display: flex;
        flex-direction: column;
    }

    .homeContainer {
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        height: 100vh;
        overflow: auto;
    }

    .homeElementContainer {
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: ${({theme}) => theme.values.size.items.appPadding}px;
    }

    .outletContainer {
        display: flex;
        flex: 1;
        flex-direction: column;
        box-sizing: border-box;
        overflow: auto;
    }
`;