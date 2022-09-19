import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { NavbarComponent } from './components/layout-area/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ProductsComponent } from './components/shop-area/products/products.component';
import { ProductComponent } from './components/shop-area/product/product.component';
import { ShoppingCartComponent } from './components/shop-area/shopping-cart/shopping-cart.component';
import { PaymentPageComponent } from './components/shop-area/payment-page/payment-page.component';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCommonModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    LogoComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    ShoppingCartComponent,
    PaymentPageComponent,
    AdminComponent,
    AddProductComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
