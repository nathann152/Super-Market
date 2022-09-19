import { CartDetailModel } from './../4-models/cart-detail-model';
import { CartModel } from './../4-models/cart-model';
import shopLogic from "../5-logic/shop-logic";
import express, { NextFunction, Request, Response } from "express";
const router = express.Router();


// create cart 

router.post('/create-cart', async (request: Request, response: Response, next: NextFunction) => {
    try{
        const cart = new CartModel();
        cart.date = new Date();
        cart.userId = request.body;
        const result = await shopLogic.createCart(cart);
        response.status(200).send(result);
    }
    catch (err: any) {
        next(err.message);
    }
});

// add product to cart

router.post('/add-product', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new CartDetailModel(request.body);
        const checkProduct = await shopLogic.checkIfProductExistsInCart(product);
        if (checkProduct) {
            throw 'Product already in cart!'
        }
        const addedProduct = await shopLogic.addProduct(product);
        response.json(addedProduct);
    }   catch (err: any) {
        next(err.message);
    }
});



router.post('/get-all-products', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.body.cartId;
        const products = await shopLogic.getAllProductsInCart(cartId);
        response.json(products);
    }  catch (err: any) {
        next(err.message);
    }
});

router.put('/update-product', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const oldProduct = new CartDetailModel(request.body);
        const product = await shopLogic.updateProductQuantityInCart(oldProduct);
        if (product === null) {
            response.sendStatus(404);
            return;
        }
        response.json(product);
    }  catch (err: any) {
        next(err.message);
    }
});

router.delete('/remove-product/:_id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await shopLogic.deleteProductFromCart(_id);
        response.sendStatus(204);
    }   catch (err: any) {
        next(err.message);
    }
});


router.delete('/delete-cart/:_id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await shopLogic.deleteCart(_id);
        response.sendStatus(204);
    }  catch (err: any) {
        next(err.message);
    }
});

export default router;