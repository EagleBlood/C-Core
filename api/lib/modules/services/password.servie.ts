import PasswordModel  from '../schemas/password.schema';
import bcrypt from 'bcrypt';

class PasswordService {
   public async createOrUpdate(data: any) {
       const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, { $set: { password: data.password } }, { new: true });
       if (!result) {
           const dataModel = new PasswordModel({ userId: data.userId, password: data.password });
           return await dataModel.save();
       }
       return result;
   }

   public async authorize(userId: string, password: string) {
    try {
        const user = await PasswordModel.findOne({ userId: userId });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return true;
            }
        }
    } catch (error) {
        console.error('Error during authorization:', error);
        throw new Error('Error during authorization');
    }
    return false;
}

   async hashPassword(password: string): Promise<string> {
       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(password, saltRounds);
       console.log('hash', hashedPassword)
       return hashedPassword;
   }

}

export default PasswordService;