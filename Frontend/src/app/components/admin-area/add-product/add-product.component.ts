
import { AdminService } from 'src/app/services/admin.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    public categories: CategoryModel[] = [];
    public product = new ProductModel();
    @ViewChild("imageFile")
    public imageFileRef: ElementRef<HTMLInputElement>;

  constructor(private adminService: AdminService, private router: Router ) { }

 async ngOnInit(){
    try{
        this.categories = await this.adminService.getAllCategories();
    }
    catch(err: any){
        alert(err.message);
        }
  }

    public async send(){
        try{
            this.product.img = this.imageFileRef.nativeElement.files[0];
            await this.adminService.addProduct(this.product);
            alert('product has been added!');
            this.router.navigateByUrl("/admin");
        }
        catch(err: any){
            alert(err.message);
        }
    }
}
