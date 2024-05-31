import express from 'express';
import cors from 'cors';
import { config } from './config';
import Controller from "./interfaces/controller.interface";
import bodyParser from 'body-parser';
import WebSocketController from './controllers/ws.controller';
import mongoose from 'mongoose';
import { logRequests } from './middlewares/deviceIdParam.middleware';
import { Server } from 'socket.io';
import * as http from "http";

class App {
    public app: express.Application;
    private io: Server;
    private httpServer: any;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer, {
            cors: {
                origin: 'http://localhost:5173', 
                methods: ['GET', 'POST'],
            },
        });

        
       this.initializeMiddlewares();
       this.initializeControllers(controllers);
       this.connectToDatabase();
       this.initializeSockets();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        //this.app.use(morgan('dev'));
        this.app.use(logRequests);
    }
    

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(config.databaseUrl);
            console.log('Connection with database established');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        }); 

        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
    }

    private initializeSockets(): void {
        console.log('Sockets work');
     
        const chatController = new WebSocketController(this.io);
        chatController.initializeRoutes(this.app);
     }
     

    public listen(): void {
        const server = this.httpServer.listen(config.port, () => {
            console.log(`App listening on the port ${config.port}`);
        });
    }
}
export default App;