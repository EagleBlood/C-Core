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
`;