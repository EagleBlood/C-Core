import styled from 'styled-components';

export const Wrapper = styled.main`
    /* existing styles */

    .bar {
        /* Add your styles here. For example: */
        display: flex;
        align-items: center;
        gap: 30px;
    }

    .username {
        /*fill text to entire space*/
        flex-grow: 1;
        display: flex;
    }
`;