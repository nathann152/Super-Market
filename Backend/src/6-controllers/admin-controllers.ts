import express, { NextFunction, Request, Response } from "express";
import adminLogic from "../5-logic/admin-logic";
import { v4 as uuid } from "uuid";
import { ProductModel } from "../4-models/product-model";
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/Natan/Desktop/Project 4/Backend/src/1-assets/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer ({ storage: storage });
const router = express.Router();





router.put("/update-product", async (request: any, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body);
        const result = await adminLogic.updateProduct(product);
        response.status(200).send(result);
    }
    catch (err: any) {
        next(err);
    }
});



router.post("/add-product", upload.single('img'),async (request: any, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel({
            name: request.body.name,
            price: request.body.price,
            categoryId: request.body.categoryId,
            img: request.file.filename
        });;
        const addedProduct = await adminLogic.addProduct(product);
        response.json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});
            
 

 router.get("/get-all-categories", async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await adminLogic.getAllCategories();
            response.status(200).send(result);
        }
         catch (err: any) {
            next(err.message);
        }
    });





export default router;