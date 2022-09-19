import { OrderModel } from './../4-models/oreder-model';
import express, { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import orderLogic from '../5-logic/order.logic';
const path = "C:/Users/Natan/Desktop/Project 4/Backend/src/1-assets/receipt/";
const router = express.Router();



// post receipt for order


router.post('/', async (request: any, response: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(request.body);
        order.orderDate = new Date();
        const addedOrder = await orderLogic.addOrder(order);
        // create receipt 
        const fileName = uuid();
        const receiptContent = await orderLogic.receiptContent(order);
        const receipt = await orderLogic.createReceipt(path + fileName +".txt", receiptContent);
        response.json({ order: addedOrder, receipt: receipt });
    }  catch (err: any) {
        next(err.message);
    }
} );


// get all orders

router.get('/get-all-orders', async (request: Request, response: Response, next: NextFunction) => {

    try {
        const result = await orderLogic.getAllOrders();
        response.status(200).send(result);
    } catch (err: any) {
        next(err.message);
    }
});

// get receipt 
router.get('/get-receipt', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const receipt = await orderLogic.receiptContent(path + request.body.name);
        response.status(200).send(receipt);
    } catch (err: any) {
        next(err.message);
    }
});


export default router;
