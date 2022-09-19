import { CategoryModel, ICategoryModel } from "../4-models/category-model";
import { IProductModel, ProductModel } from "../4-models/product-model";

async function updateProduct(product:IProductModel){
    try {
        return new Promise((resolve, reject) => {
            ProductModel.updateOne({ _id: product._id }, product, (err: any, info: { n: any; }) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(info.n ? product : null);
            });
        });
    }
    catch (err) {
        throw err;
    }
}

async function addProduct(product:IProductModel):Promise<IProductModel>{
    try {
        const newProduct = new ProductModel(product);
         return await newProduct.save();   
        }
    catch (err) {
        throw err;
    }
}

async function getAllCategories():Promise<ICategoryModel[]>{
    try {
        return await CategoryModel.find({}).exec();
    }
    catch (err) {
        throw err;
    }
}


export default {
    updateProduct,
    addProduct,
    getAllCategories
};

