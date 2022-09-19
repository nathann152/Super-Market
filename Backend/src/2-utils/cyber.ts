import crypto from "crypto";
import { Request, Response ,NextFunction } from "express";


const secret = "some secret";

function hash(password) {
    return crypto.createHmac("sha512", secret).update(password).digest("hex");
}

function verifyToken(request: any, response: Response, next: NextFunction) {
    const bearerHeader = request.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        request.token = bearerToken;
        next();
    } else {
        request.sendStatus(403);
    }
    
}
function comparePasswords(password, hash) {
    return crypto.createHmac("sha512", secret).update(password).digest("hex") === hash;
}


export default {
    hash,
    verifyToken,
    comparePasswords
}