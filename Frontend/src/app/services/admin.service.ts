import { ProductModel } from 'src/app/models/product';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CategoryModel } from '../models/category';


@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }

     public async getAllCategories():Promise<CategoryModel[]>{ 
        const observable = this.http.get<CategoryModel[]>(environment.adminUrl + 'get-all-categories');
        const product = await firstValueFrom(observable);
        return product;
    }
    public async addProduct(product: ProductModel): Promise<void> {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price.toString());
        formData.append('img', product.img);
        formData.append('categoryId', product.categoryId);
        await firstValueFrom(this.http.post<void>(environment.adminUrl + 'add-product', formData));

    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {
        const observable = this.http.put<ProductModel>(environment.adminUrl + 'update-product', product);
        const result = await firstValueFrom(observable);
        return result;

    }
}


