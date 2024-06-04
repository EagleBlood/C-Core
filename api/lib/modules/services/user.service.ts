import  UserModel  from '../schemas/user.schema';
import {IUser} from "../models/user.model";

class UserService {
   public async createNewOrUpdate(user: IUser) {
   
       try {
           if (!user._id) {
               const dataModel = new UserModel(user);
               return await dataModel.save();
           } else {
               return await UserModel.findByIdAndUpdate(user._id, { $set: user }, { new: true });
           }
       } catch (error) {
           console.error('Error during data creation', error);
           throw new Error('Error during data creation');
       }
   }

   public async getByEmailOrName(name: string) {
       try { 
        const result = await UserModel.findOne({ $or: [{ email: name }, { name: name }] });
       if (result) {
           return result;
       }
   } catch (error) {
       console.error('Error during data download', error);
       throw new Error('Error during data download');
   }
}

    public getAll = async (): Promise<IUser[]> => {
        try {
        const users = await UserModel.find();
        return users;
        } catch (error) {
        console.error(`Error fetching users: ${error}`);
        throw error;
        }
    };

    public async remove(userId: string) {
        try {
            return await UserModel.findByIdAndDelete(userId);
        } catch (error) {
            console.error('Error during data removal', error);
            throw new Error('Error during data removal');
        }
    }
}

export default UserService;