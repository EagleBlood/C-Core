export interface Device {
    deviceId: number;
    temperature?: number;
    pressure?: number;
    humidity?: number;
    readingDate?: string;
    location?: string;
};