import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NgMaterialModule } from './shared/ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CardComponent } from './components/card/card.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { ProductDeleteDialogComponent } from './components/product-delete-dialog/product-delete-dialog.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsListComponent } from './components/admin/products-list/products-list.component';
import { ProductsDeleteComponent } from './components/admin/products-delete/products-delete.component';
import { ProductsUpdateComponent } from './components/admin/products-update/products-update.component';
import {AdminModule} from "./admin/admin.module";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NotFoundComponent,
    MainComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    DashboardComponent,
    NavigationComponent,
    ProductsComponent,
    ProductDetailComponent,
    CardComponent,
    AddToCartComponent,
    ShopCartComponent,
    ProductDeleteDialogComponent,
    ProductFilterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMaterialModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, MatGridListModule, MatMenuModule, MatIconModule, LayoutModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, AdminModule
  ],
  providers: [
    // {
    //   provide: UserService,
    //   useClass: UserService
    // }
    // {
    //   provide: AuthService,
    //   useClass: AuthService
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
