import DataModel from '../schemas/data.schema';
import {IData, Query} from "../models/data.model";
import { config } from '../../config';

export default class DataService {



    public async createData(dataParams: IData) {
        try {
            const dataModel = new DataModel(dataParams);
            await dataModel.save();
        } catch (error) {
            console.error('Error during DB creation:', error);
            throw new Error('Error during DB creation');
        }
    }

    public async query(deviceID: string) {
        try {
            const data = await DataModel.find({deviceId: deviceID}, { __v: 0, _id: 0 });
            return data;
        } catch (error) {
                throw new Error(`Query failed: ${error}`);
        }
    }

    public async get(deviceID: string) {
        let limit = 1;
        try {
            const data = await DataModel.find({deviceId: deviceID}, { __v: 0, _id: 0 }).limit(limit).sort({$natural:-1})
            return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async getAllNewest(): Promise<(typeof DataModel | { deviceId: number, location?: string } | {})[]> {
        const latestData: (typeof DataModel | { deviceId: number, location: string } | {})[] = [];
        await Promise.all(
            Array.from({ length: 17 }, async (_, i) => {
                try {
                    // Fetch the latest entry for the device, including the location
                    const latestEntry = await DataModel.findOne({ deviceId: i }, { __v: 0, _id: 0 }).sort({ $natural: -1 });
                    if (latestEntry) {
                        // Use the latest entry directly, assuming it includes the most recent location update
                        latestData.push({ ...latestEntry.toObject(), deviceId: i });
                    } else {
                        // If there's no entry, still include the device with a null location
                        latestData.push({ deviceId: i, location: null });
                    }
                } catch (error: any) {
                    console.error(`Error while fetching data for device ${i + 1}: ${error.message}`);
                    latestData.push({ deviceId: i, location: null }); // Error case, include deviceId and null location
                }
            })
        );
        return latestData;
    }

    public async updateDeviceLocation(deviceId: number, newLocation: string): Promise<void> {
        try {
            await DataModel.updateMany({ deviceId }, { $set: { location: newLocation } });
            console.log(`Location updated for all devices with ID ${deviceId} to ${newLocation}`);
        } catch (error) {
            console.error(`Error updating location for devices with ID ${deviceId}: ${error}`);
            throw error; // Rethrow or handle as needed
        }
    }

    public async deleteData(deviceID: string) {
        try {
            await DataModel.deleteMany({deviceId: deviceID});
        } catch (error) {
            throw new Error(`Delete failed: ${error}`);
        }
    }
}
 