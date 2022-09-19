import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    public user: UserModel;
    public products: ProductModel[];
    public product: ProductModel = new ProductModel();
    public categories: any = [];
    public newProduct: boolean = false;
    public editProduct: boolean = false;

    constructor(private myProductsService: ProductsService, private adminService: AdminService,private router: Router) { }

    async ngOnInit() {
        try{ 
        store.subscribe(() => {
            this.user = store.getState().user;
        });
         this.products = await this.myProductsService.getAllProducts()

         this.categories = await this.adminService.getAllCategories()    
    }
    catch(err: any){
        alert(err.message);
    }
    }


   




    public updateImg(event: any): void {
        this.product.img = event.target.files[0];
    }

    public goToEditProduct(_id: string): void {
        this.editProduct = true;
        const selectedProduct = this.products.find(p => p._id === _id);
        this.product = selectedProduct;
    }

    public goToAddProduct(): void {
        this.router.navigateByUrl('/admin/add-product');
    }


    public async updateProduct(){
        try{
            const myForm: FormData = new FormData();
            myForm.append('image', this.product.img);
            myForm.append('product', JSON.stringify(this.product));
            this.adminService.updateProduct(this.product).then(res => {
                const index = this.products.findIndex(product => product._id === res);
                this.products[index] = res;
                alert('product has been updated!');
                this.goBack();
            }, err => alert(err.message))
        }
        catch(err:any){
            alert(err.message);
        }
    }
    

    public goBack(): void {
        this.newProduct = false;
        this.editProduct = false;
        this.product = new ProductModel();
    }
}
