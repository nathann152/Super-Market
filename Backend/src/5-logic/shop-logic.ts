import { CartDetailModel , ICartDetailModel} from './../4-models/cart-detail-model';
import { CartModel, ICartModel } from "../4-models/cart-model";
import { ProductModel , IProductModel } from "../4-models/product-model";




async function createCart(cart:ICartModel):Promise<ICartModel>{
        const newCart = new CartModel(cart);
        return await newCart.save();
}

async function addProduct(product: any):Promise<IProductModel>{
        return product.save();
}

// Check if the product is already in the cart
async function checkIfProductExistsInCart(product:any): Promise<IProductModel> {
    return CartDetailModel.findOne({ cartId: product.cartId, productId: product.productId });
}

// update product quantity in cart
async function updateProductQuantityInCart(product:any):Promise<ICartDetailModel>{
        return await CartDetailModel.findByIdAndUpdate(product._id, product, { new: true });
}
      

// get all products in cart

async function getAllProductsInCart(cartId:string):Promise<IProductModel[]>{
        return await CartDetailModel.find({ cartId: cartId });
    
}

// delete product from cart

async function deleteProductFromCart(_id:string):Promise<any>{
  
        return await CartDetailModel.deleteOne({ _id: _id });
} 
 

// delete all products from cart

async function clearCart(cartId:string):Promise<any>{
        return await CartDetailModel.deleteMany({cartId});
}

// delete cart

async function deleteCart(_id:string):Promise<any>{
        return await CartModel.deleteOne({ _id: _id });
}

export default {
    deleteCart,
    clearCart,
    deleteProductFromCart,
    getAllProductsInCart,
    updateProductQuantityInCart,
    checkIfProductExistsInCart,
    addProduct,
    createCart
};





