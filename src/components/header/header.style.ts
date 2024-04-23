import styled from 'styled-components';

export const Wrapper = styled.main`


    .bar {
        display: flex;
        align-items: center;
        gap: ${({theme}) => theme.values.size.items.appPadding}px;
    }

    .username {
        flex-grow: 1;
        display: flex;
    }

    button h2 {
        transition: 0.5s;
    }

    button h2:hover {
        font-size: 1.3em;
        transition: ${({theme}) => theme.values.time.fast}s,
    }
`;