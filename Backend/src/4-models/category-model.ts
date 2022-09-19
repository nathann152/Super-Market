import mongoose from "mongoose";

export interface ICategoryModel extends mongoose.Document {
    name: string;
}

export const categorySchema = new mongoose.Schema<ICategoryModel>({
    name: String
});


export const CategoryModel = mongoose.model<ICategoryModel>("Category", categorySchema, "categories");