import express, { NextFunction, Request, Response } from "express";
import productsLogic from "../5-logic/products-logic";
import fs from "fs";
const router = express.Router();



router.get("/products-by-category/:categoryId", async (request: any, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId;
        const result = await productsLogic.getProductsByCategory(categoryId);
        response.json(result);
    } catch (err: any) {
        next(err.message);
    }
});


// get all products

router.get("/get-all-products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = await productsLogic.getAllProducts();
        response.status(200).send(result);
    } catch (err: any) {
        next(err.message);
    }
});

router.get("/search-product/:name", async (request: any, response: Response, next: NextFunction) => {
    try {
        const name = request.params.name;
        const result = await productsLogic.searchProductByName(name);
        response.json(result);
    } catch (error) {
        response.status(500).send(error.message);
    }
} );

router.get("/image/:name", async (request: any, response: Response, next: NextFunction) => {
    const name = request.params.name;
    const newLocal = "C:/Users/Natan/Desktop/Project 4/Backend/src/1-assets/images/" + name;
    fs.readFile(newLocal , (err: any, data: any) => {
        if (err) {
            response.status(500).send(err.message);
        } else {
            response.end(data);
        }
    });
});





export default router;
