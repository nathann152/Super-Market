import mongoose from "mongoose";
import { mainModule } from "process";

export interface IUserModel extends mongoose.Document {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    city: string,
    street: string,
    isAdmin: boolean,
}

export const userSchema = new mongoose.Schema<IUserModel>({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 320
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1000
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

userSchema.virtual("shoppingCart", {
    ref: "Cart",
    localField: "id",
    foreignField: "userId",
    justOne: true
});

export const UserModel = mongoose.model<IUserModel>("User", userSchema, "users");


