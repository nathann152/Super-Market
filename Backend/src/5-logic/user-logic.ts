import cyber from '../2-utils/cyber';
import { IUserModel, UserModel } from './../4-models/user-model';


 async function register(user: IUserModel): Promise<IUserModel>{
    try {
        user.password = cyber.hash(user.password);
        const newUser = new UserModel(user);
        return await newUser.save();
    }
    catch (err) {
        throw err;
    }
}

    async function login(details: any): Promise<any> {
        try {
            details.password = cyber.hash(details.password);
          return UserModel.find({ email: details.email, password: details.password });
        }
        catch (err) {
            throw err;
        }
    }

    async function checkId(id: any): Promise<any> {
        try {
            const result = await UserModel.find({ id }).exec();
            return result;
        }
        catch (err) {
            throw err;
        }
    }


    async function checkEmail(email: string): Promise<any> {
        try {
            const result = await UserModel.find({ email }).exec();
            return result;
        }
        catch (err) {
            throw err;
        }
    }

    export default {
        register,
        login,
        checkId,
        checkEmail
    };
