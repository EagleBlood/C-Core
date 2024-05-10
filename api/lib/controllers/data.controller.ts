import { checkIdParam } from '../middlewares/deviceIdParam.middleware';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';

interface DataStore {
    [key: string]: number[];
}

let dataStore: DataStore = {
    "1": [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6],
    "2": [7,8,9,2,5,3,7,5,13,5,6,4,3,6,3,6],
    // Add more devices as needed
};

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService: DataService;
 
    constructor() {
        this.initializeRoutes();
        this.dataService = new DataService();
    }
 
    private initializeRoutes() {
        // Get all data
        this.router.get(`${this.path}/all`, this.getAllData);

        // Device specific data
        this.router.get(`${this.path}/:id`, checkIdParam, this.getAllDeviceData);
        this.router.get(`${this.path}/:id/:index`, checkIdParam, this.getIndexData);
        this.router.get(`${this.path}/:id/from/:to`, checkIdParam, this.getRangeData);

        // Device add data
        this.router.post(`${this.path}/add/:id`, checkIdParam, this.addData);

        // Device delete data
        this.router.delete(`${this.path}/delete/:id`, checkIdParam, this.deleteAllDataFromDevice);
    }
    
    private getAllDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query(id);
        response.status(200).json(allData);
    };

    private getAllData = async (request: Request, response: Response, next: NextFunction) => {
        const allData = await this.dataService.getAllNewest();
        response.status(200).json(allData);
    }

    private getIndexData = async (request: Request, response: Response, next: NextFunction) => {
        const { id, index } = request.params;
        const deviceData = dataStore[id];
        if (!deviceData) {
            response.status(404).send('No data found for this device');
            return;
        }
        const indexData = deviceData[parseInt(index)];
        if (indexData === undefined) {
            response.status(404).send('No data found at this index');
            return;
        }
        response.status(200).json(indexData);
    };

    private getRangeData = async (request: Request, response: Response, next: NextFunction) => {
        const { id, from, to } = request.params;
        const deviceData = dataStore[id];
        if (!deviceData) {
            response.status(404).send('No data found for this device');
            return;
        }
        const rangeData = deviceData.slice(parseInt(from), parseInt(to) + 1);
        response.status(200).json(rangeData);
    };

    private deleteAllDataFromDevice = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        try {
            await this.dataService.deleteData(id);
            response.status(200).send('All data purged successfully for this device');
        } catch (error) {
            next(error);
        }
    };
     
     private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;
     
        const data = {
            temperature: air[0].value,
            pressure: air[1].value,
            humidity: air[2].value,
            deviceId: Number(id),
            readingDate : new Date()
        }
       
        try {
            await this.dataService.createData(data);
            response.status(200).json(data);
        } catch (error) {
            console.error(`Validation Error: ${error}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
     };
     
}
 
export default DataController;