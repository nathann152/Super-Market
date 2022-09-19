import { UserModel } from './../4-models/user-model';
import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import userLogic from "../5-logic/user-logic";
import jwt from "jsonwebtoken";
import cyber from "../2-utils/cyber";


router.post('/register', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        //check if user & email exists
        const checkEmail = await userLogic.checkEmail(user.email);
        const checkId = await userLogic.checkId(user.id);
        if (checkEmail.length !== 0) { throw "Email already exists" }
        if (checkId.length !== 0) { throw "ID already exists" }
        /// --------------------
        const newUser = await userLogic.register(user);
        newUser.password = null;
        //save jwt token
        const jwtToken = jwt.sign({ user: newUser }, 'secretkey');
        response.json({ user: newUser, jwtToken });
    }catch (error) {
        next(error);
    }
});

router.post('/login', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const details = request.body;
        const getUser = await userLogic.login(details);
        if (getUser.length === 0) {
            response.json('Wrong email / password');
            return;
        }
        const user = getUser[0];
        const jwtToken = jwt.sign({ user }, 'secretkey');
        response.json({ user, jwtToken });
    } catch (error) {
        next(error);
    }
}); 


router.post('/check-form', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const form = request.body;
        // check if email & ID already taken.
        form.email = await userLogic.checkEmail(form.email);
        form.id = await userLogic.checkId(form.id);
        response.json(form);
    } catch (error) {
        next(error);
    }
});

router.get('/auto-login', cyber.verifyToken, (request: any, response: any, next: NextFunction) => {
    try{
        jwt.verify(request.token, 'secretkey', (err, authData) => {
            if (err) {
                response.json(err);
            } else {
                response.json(authData);
            }
        });
    }
    catch (error) {
        next(error);
    }
});
export default router;