import mongoose from "mongoose";


export interface IOrderModel extends mongoose.Document {
    cartId: mongoose.Schema.Types.ObjectId,
    totalPrice: number,
    shippingDate: Date,
    orderDate: Date,
    city: string,
    street: string,
    creditCard: mongoose.Schema.Types.Decimal128,
}

export const orderSchema = new mongoose.Schema<IOrderModel>({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Cart"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingDate: {
        type: Date,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    creditCard: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

orderSchema.virtual("order-cart", {
    ref: "Cart",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

export const OrderModel = mongoose.model<IOrderModel>("Order", orderSchema, "orders");
