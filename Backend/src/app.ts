import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import { RouteNotFoundError } from "./4-models/error-models";
import dal from "./2-utils/dal";


import adminController from "./6-controllers/admin-controllers";
import productsController from "./6-controllers/products-controller";
import userController from "./6-controllers/user-controller";
import orderController from "./6-controllers/order-controller";
import shopController from "./6-controllers/shop-controller";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/admin", adminController);
server.use("/api/user",userController);
server.use("/api/shopping",shopController);
server.use("/api/order",orderController);
server.use("/api/products", productsController);


server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new RouteNotFoundError(request.method, request.originalUrl));
});

server.use(catchAll);


server.listen(config.port, () => {
    dal.connect()
    console.log(`Listening on http://localhost:${config.port}`)
});


