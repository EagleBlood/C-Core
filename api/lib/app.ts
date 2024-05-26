import express from 'express';
import cors from 'cors';
import { config } from './config';
import Controller from "./interfaces/controller.interface";
import bodyParser from 'body-parser';
import WebSocket from 'ws';
import mongoose from 'mongoose';
import { logRequests } from './middlewares/deviceIdParam.middleware';

class App {
    public app: express.Application;
    private wss!: WebSocket.Server;

    constructor(controllers: Controller[]) {
       this.app = express();
       this.initializeMiddlewares();
       this.initializeControllers(controllers);
       this.connectToDatabase();
       this.initializeWebSocketServer();
    }

    private initializeWebSocketServer(): void {
        this.wss = new WebSocket.Server({ noServer: true });
        this.wss.on('connection', (ws: WebSocket) => {
            ws.on('message', (message: string) => {
                console.log('received: %s', message);
                const data = JSON.parse(message);
                ws.send(JSON.stringify(data));
            });
        });
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

    public listen(): void {
        const server = this.app.listen(config.port, () => {
            console.log(`App listening on the port ${config.port}`);
        });
    
        server.on('upgrade', (request, socket, head) => {
            this.wss.handleUpgrade(request, socket, head, (ws) => {
                this.wss.emit('connection', ws, request);
            });
        });
    }
}
export default App;