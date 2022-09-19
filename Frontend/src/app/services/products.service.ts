import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(private http: HttpClient) { }

  public async getAllProducts(): Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>(environment.productsUrl + "get-all-products");
    const products = await firstValueFrom(observable);
    return products;
  }
  public async searchProduct(name: string): Promise<ProductModel[]> {
    const observable =  this.http.get<ProductModel[]>(environment.productsUrl + "search-product/" + name);
    const products = await firstValueFrom(observable);
    return products;
  }

    public async getProductsByCategory(categoryId: string): Promise<ProductModel[]> {
        const observable = this.http.get<ProductModel[]>(environment.productsUrl + "products-by-category/" + categoryId);
        const products = await firstValueFrom(observable);
        return products;
    }

}
