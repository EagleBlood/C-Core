import { RequestHandler, Request, Response, NextFunction } from 'express';
import { config } from "../config";

export const checkIdParam: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
   const { id } = request.params;
   const parsedValue = parseInt(id, 10);
   if (isNaN(parsedValue) || parsedValue >= config.supportedDevicesNum) {
       return response.status(400).send('Missing or wrong device ID parameter');
   }
   next();
};

export const logRequests: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    console.log(`[${request.method} ${request.url} ${new Date().toISOString()}]`);
    next();
};