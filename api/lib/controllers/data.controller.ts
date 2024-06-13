import { checkIdParam } from '../middlewares/deviceIdParam.middleware';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import Joi from 'joi';
import * as WebSocket from 'ws';
import { Socket } from 'socket.io';
import sendViaSocet from './ws.controller';
import WebSocketController from './ws.controller';


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
        this.router.get(`${this.path}/:id/:from/:to`, checkIdParam, this.getRangeData);

        // Device add data
        this.router.post(`${this.path}/add/:id`, checkIdParam, this.addData);
        this.router.post(`${this.path}/updateLocation/:id`, this.updateDeviceLocationHandler);

        // Device delete data
        this.router.delete(`${this.path}/delete/:id`, checkIdParam, this.deleteAllDataFromDevice);
    }

    private updateDeviceLocationHandler = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        // Change from newLocation to location
        const { location: newLocation } = request.body;
    
        // Debugging: Log the received newLocation
        console.log(`Updating location for device ${id} to:`, newLocation);
    
        if (newLocation === undefined) {
            return response.status(400).json({ error: 'newLocation must be provided.' });
        }
    
        try {
            await this.dataService.updateDeviceLocation(parseInt(id), newLocation);
            response.status(200).json({ message: `Location updated for device ${id} to ${newLocation}` });
        } catch (error) {
            next(error); // Pass errors to the error handling middleware
        }
    };
    
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
        const deviceData = await this.dataService.query(id);
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
        const deviceData = await this.dataService.query(id);
        if (!deviceData || deviceData.length === 0) {
            response.status(404).send('No data found for this device');
            return;
        }
        const rangeData = deviceData.slice(parseInt(from), parseInt(to));
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
        const { temperature, pressure, humidity } = request.body;
        const { id } = request.params;

        const schema = Joi.object({
            temperature: Joi.number().positive().required(),
            pressure: Joi.number().positive().required(),
            humidity: Joi.number().positive().required(),
            deviceId: Joi.number().integer().positive().valid(parseInt(id, 10)).required()
        });
    
        const data = {
            temperature,
            pressure,
            humidity,
            deviceId: Number(id),
            readingDate : new Date(),
            location: 'unknown'
        }
    
        try {
            await this.dataService.createData(data);
        
            response.status(200).json(data);
        } catch (error) {
            console.error(`Validation Error: ${error}`);
            console.error(error); // Log the error object
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };
}
 
export default DataController;