import styled from 'styled-components';

export const Wrapper = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;

    .scrollContainer {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.mediumGap}px;
        width: 100%;
        max-height: 100vh;
        overflow-y: auto;
    }
`;