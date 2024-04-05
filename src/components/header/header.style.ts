import styled from 'styled-components';

export const Wrapper = styled.main`


    .bar {
        /* Add your styles here. For example: */
        display: flex;
        align-items: center;
        gap: ${({theme}) => theme.text.size.items.appPadding}px;
    }

    .username {
        /*fill text to entire space*/
        flex-grow: 1;
        display: flex;
    }
`;