import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/layout-area/home/home.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { PaymentPageComponent } from './components/shop-area/payment-page/payment-page.component';
import { AdminComponent } from './components/admin-area/admin/admin.component';


const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "payment", component: PaymentPageComponent },
    { path: "admin", component: AdminComponent},
    { path: "admin/add-product", component: AddProductComponent},
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", redirectTo: "/home", pathMatch: "full" }
  
  ];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
