import mongoose from "mongoose";

export interface ICartDetailModel extends mongoose.Document {
    cartId: mongoose.Schema.Types.ObjectId,
    productId:  mongoose.Schema.Types.ObjectId,
    amount: number;
    price: number;
    name: string;
}

export const cartDetailSchema = new mongoose.Schema<ICartDetailModel>({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Cart"   
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

cartDetailSchema.virtual("cartDetail", {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

export const CartDetailModel = mongoose.model<ICartDetailModel>("CartDetail", cartDetailSchema, "cartDetails");

   