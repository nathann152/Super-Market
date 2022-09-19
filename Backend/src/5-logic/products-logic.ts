import { CategoryModel, ICategoryModel } from './../4-models/category-model';
import { IProductModel, ProductModel } from "../4-models/product-model";


async function getAllProducts():Promise<IProductModel[]>{
     return await ProductModel.find();
}

// search product by name
async function searchProductByName(name:string):Promise<IProductModel[]>{
     return await ProductModel.find({ name: new RegExp(name)}).exec();
}

async function getProductsByCategory(categoryId:string):Promise<IProductModel[]>{
  return await ProductModel.find({ categoryId: categoryId }).populate("types").exec();
}


export default {
    getAllProducts,
    searchProductByName,
    getProductsByCategory
};

