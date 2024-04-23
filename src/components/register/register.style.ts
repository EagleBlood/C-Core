import styled from 'styled-components';

export const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .loginMenu {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.smallGap}px;
        justify-content: center;
        width: 100%;
        max-width: 500px;
    }
    
    @keyframes dots {
        0%, 20% { content: ''; }
        25%, 45% { content: '.'; }
        50%, 70% { content: '. .'; }
        75%, 95% { content: '. . .'; }
        100% { content: ''; }
    }
    
    .dots::after {
        content: '';
        display: inline-block;
        animation: dots 4s steps(1, end) infinite;
    }
      
`;