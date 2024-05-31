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

    public async getAllNewest(): Promise<(typeof DataModel | { deviceId: number } | {})[]> {
        const latestData: (typeof DataModel | { deviceId: number } | {})[] = [];
        await Promise.all(
            Array.from({ length: 17 }, async (_, i) => {
                console.log(`Checking device id: ${i}`); // Log the device id
                try {
                    const latestEntry = await DataModel.find({ deviceId: i  }, { __v: 0, _id: 0 }).limit(1).sort({$natural:-1});
                    if (latestEntry && latestEntry.length > 0) {
                        latestData.push(latestEntry[0]);
                    } else {
                        latestData.push({deviceId: i});
                    }
                } catch (error: any) {
                    console.error(`Błąd podczas pobierania danych dla urządzenia ${i + 1}: ${error.message}`);
                    latestData.push({});
                }
            })
        );
        return latestData;
    }

    public async deleteData(deviceID: string) {
        try {
            await DataModel.deleteMany({deviceId: deviceID});
        } catch (error) {
            throw new Error(`Delete failed: ${error}`);
        }
    }
}
 