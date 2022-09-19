import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public dairyProducts: ProductModel[] = [];
  public meatAndFish: ProductModel[] = [];
  public fruitsAndVegetables: ProductModel[] = [];
  public searchStatus = false;
  public searchStr: string;
  public searchProducts: ProductModel[] = [];
  public products: ProductModel[];


  constructor(private myProductsService: ProductsService) { }

 async ngOnInit() {
    const dairyId = "5eb99c6201af09f44df2c2fe";
    const meatAndFishId = "5eb99c7701af09f44df2c30c";
    const fruitsAndVegetables = "5eb99c9301af09f44df2c31a";

    this.dairyProducts = await this.myProductsService.getProductsByCategory(dairyId);
    this.meatAndFish = await this.myProductsService.getProductsByCategory(meatAndFishId);
    this.fruitsAndVegetables = await this.myProductsService.getProductsByCategory(fruitsAndVegetables);

 }

  public async  searchProduct() {
    this.products = await  this.myProductsService.searchProduct(this.searchStr)
    if(this.products.length > 0){
      this.searchStatus = true;
      this.searchProducts = this.products;
    }


  }


  public backToAllProducts(): void {
    this.searchStr = '';
    this.searchStatus = false;
    this.searchProducts = [];
  }
}
