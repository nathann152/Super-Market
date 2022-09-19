import { CategoryModel } from './category-model';
import mongoose from "mongoose";


export interface IProductModel extends mongoose.Document {
    name: string;
    price: number;
    categoryId: mongoose.Schema.Types.ObjectId;
    img: string;
}

   export const ProductSchema = new mongoose.Schema<IProductModel>({
    name: {
        type: String,
        minlength: 2,
        maxlength: 40
    },
    price: {
        type: Number,
        min: 0,
        max: 100000
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    img: {
        type: String,
        
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

ProductSchema.virtual("cartDetail", {
    ref: "CartDetail",
    localField: "_id",
    foreignField: "productId"
});

ProductSchema.virtual("types", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});
  
export const ProductModel = mongoose.model<IProductModel>("Product", ProductSchema, "products");
 

