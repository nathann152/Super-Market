import mongoose from "mongoose";


export interface ICartModel extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId,
    date: Date,
}

export const cartSchema = new mongoose.Schema<ICartModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    date: {
        type: Date,
        required: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

cartSchema.virtual("shoppingCart", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

cartSchema.virtual("cartDetails", {
    ref: "CartDetail",
    localField: "_id",
    foreignField: "cartId",
    justOne: false
});

cartSchema.virtual("order", {
    ref: "Order",
    localField: "_id",
    foreignField: "cartId",
    justOne: true
    });

export const CartModel = mongoose.model<ICartModel>("Cart", cartSchema,"carts");

