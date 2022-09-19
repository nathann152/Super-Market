import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
    public products: number = 0;
    public product: ProductModel[];


    public orders:number = 0;
  
    constructor(private myProductsService: ProductsService, private myOrderServices: OrderService) { }
  
    async ngOnInit(){
    this.product =  await this.myProductsService.getAllProducts()
    this.products = this.product.length;
        this.myOrderServices.getAllOrder()
        .subscribe(res => this.orders = res.length, err => alert(err.message));
    }
  
  }
