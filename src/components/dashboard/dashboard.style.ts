import styled from 'styled-components';

export const Wrapper = styled.main`
    display: flex;
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

    .deviceInfoContainer {
        display: flex;
        flex-direction: row;
        gap: ${({theme}) => theme.values.size.items.miniGap}px;
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
        border: 1px solid ${({theme}) => theme.colors.bg.bgStroke};
        border-radius: ${({theme}) => theme.values.size.items.radiusNormal}px;
        
    }

    .deviceInfo,
    .deviceInfoSpecial {
        display: flex;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.miniGap}px;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .deviceInfoSpecial,
    .deviceInfoSpecial svg path {
        color: ${({theme}) => theme.colors.text.textSpecial};
        fill: ${({theme}) => theme.colors.text.textSpecial};
    }

    .verticleLine {
        height: 100%;
        width: 4px;
        background-color: ${({theme}) => theme.colors.bg.bgStroke};
        transition: background-color ${({theme}) => theme.values.time.slow}s;
    }

    .deviceListContainer {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: ${({theme}) => theme.values.size.items.mediumGap}px;
        border: 1px solid ${({theme}) => theme.colors.bg.bgStroke};
        border-radius: ${({theme}) => theme.values.size.items.radiusNormal}px;
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
    }
    
    .addDevice, 
    .device {
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: ${({theme}) => theme.values.size.items.radiusNormal}px;
        aspect-ratio: 1 / 1;
        transition: background-color ${({theme}) => theme.values.time.slow}s;
    }
    
    .addDevice {
        background-color: ${({theme}) => theme.colors.bg.bgThird};
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    .addDevice:hover {
        background-color: ${({theme}) => theme.colors.bg.bgSpecial};
        transition: background-color ${({theme}) => theme.values.time.fast}s;

    }
    
    .device {
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;  // To blocks be all the same, gona wrap the text inside
        gap: ${({theme}) => theme.values.size.items.miniGap}px;
        background-color: ${({theme}) => theme.colors.bg.bgThird};
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    .device h1,
    .device h2,
    .device p {
    transition: color ${({theme}) => theme.values.time.fast}s;
    }

    .device:hover {
        background-color: ${({theme}) => theme.colors.bg.bgSpecial};
        color: ${({theme}) => theme.colors.text.textPrimary};
        transition: background-color ${({theme}) => theme.values.time.fast}s;
    }

    .device.selected {
        text-align: center;
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
        aspect-ratio: auto;
        grid-column: 1 / -1;
        background-color: ${({theme}) => theme.colors.bg.bgSpecial};
        transition: none;
        color: ${({theme}) => theme.colors.text.textPrimary};
    }

    .chartContainer {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: ${({theme}) => theme.values.size.items.mediumGap}px;
        min-height: 300px;
        max-height: 400px;
        border: 1px solid ${({theme}) => theme.colors.bg.bgStroke};
        border-radius: ${({theme}) => theme.values.size.items.radiusNormal}px;
        padding: ${({theme}) => theme.values.size.items.itemPaddingNormal}px;
    }
`;