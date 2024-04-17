import styled from 'styled-components';

export const Wrapper = styled.main`
    ${({theme}) => theme.typography};
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    padding: ${({theme}) => theme.values.size.items.appPadding}px ${({theme}) => theme.values.size.items.appPadding}px 0px ${({theme}) => theme.values.size.items.appPadding}px;
    gap: ${({theme}) => theme.values.size.items.appPadding}px;
    display: flex;
    flex-direction: column;
    background-color: ${({theme}) => theme.colors.bg.bgHelper};
    color: ${({theme}) => theme.colors.text.textPrimary};
    transition: background-color ${({theme}) => theme.values.time.slow}s;

    .homeContainer {
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        height: 100vh;
        gap: ${({theme}) => theme.values.size.items.appPadding}px;
        overflow: auto;
    }
`;