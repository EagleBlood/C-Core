import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import UserService from "../modules/services/user.service";
import TokenService from "../modules/services/token.service";
import PasswordService from '../modules/services/password.servie';
import { auth } from '../middlewares/auth.middleware';

class UserController implements Controller {
   public path = '/api/user';
   public router = Router();
   private userService = new UserService();
   private passwordService = new PasswordService();
   private tokenService = new TokenService();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.post(`${this.path}/create`, this.createNewOrUpdate);
       this.router.post(`${this.path}/auth`, this.authenticate);
       this.router.delete(`${this.path}/logout/:userId`, auth, this.removeHashSession);
       this.router.get(`${this.path}/all`, this.getAllUsers);
    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const {login, password} = request.body;
    
        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                return response.status(401).json({error: 'Unauthorized'});
            }
            await this.passwordService.authorize(user.id, await this.passwordService.hashPassword(password));
            const token = await this.tokenService.create(user);
            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (!user) {
                return response.status(400).json({error: 'Bad request', value: 'User could not be created or updated'});
            }
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error}`);
            response.status(400).json({error: 'Bad request', value: error});
        }
    };
    
    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params
    
        try {
            const result = await this.tokenService.remove(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
        try {
          const users = await this.userService.getAll();
          response.status(200).json(users);
        } catch (error) {
          console.error(`Error fetching users: ${error}`);
          response.status(500).json({error: 'Internal server error'});
        }
      };

      

}

export default UserController;