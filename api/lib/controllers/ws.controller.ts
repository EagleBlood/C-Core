import { Server, Socket } from 'socket.io';
import { Router } from 'express';

class WebSocketController {
    private io: Server;

   constructor(io: Server) {
       this.io = io;
   }

   public initializeRoutes(router: Router): void {
       this.io.on('connection', this.handleSocketConnection);
   }

   private handleSocketConnection = (socket: Socket) => {
    socket.on('newData', (data) => {
        console.log(data);
    });

     socket.on('disconnect', () => {
        console.log('User disconnected from chat');
     });
   };

}

export default WebSocketController;