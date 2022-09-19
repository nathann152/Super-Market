import fs from 'fs';
import { IOrderModel ,OrderModel } from '../4-models/oreder-model';
import shopLogic from './shop-logic';

async function addOrder(order:IOrderModel):Promise<IOrderModel>{
    try {
        const newOrder = new OrderModel(order);
        return await newOrder.save();
    }
    catch (err) {
        throw err;
    }
}

async function getAllOrders():Promise<IOrderModel[]>{
    try {
        return await OrderModel.find();
    }
    catch (err) {
        throw err;
    }
}
 

// create receipt file


async function createReceipt(fileName:any , text:any): Promise<any> {
    try {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, text, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(fileName);
            } );
        }
    ); 
    }
    catch (err) {
        throw err;
    }
}

//get receipt file

async function receiptContent(order: any): Promise<any> {
    const products = await shopLogic.getAllProductsInCart(order.cartId);
    return "Online Store" + "\n" + "--------------" + "\n" + order.orderDate + "\n" 
    + "--------------" + "\n" + "Name |    " + "Price | " + "\n"
    + " ------------------" + "\n"
    + products.map(p => `${p.name}` + "     "  + "     " + `       ${p.price}` + "\n")
    + "--------------" + "\n" + `Total Price : ${order.totalPrice} $` ;
}
export default {
    addOrder,
    getAllOrders,
    createReceipt,
    receiptContent
};
    
