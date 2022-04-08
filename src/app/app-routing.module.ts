import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UnsavedGuard } from './guards/unsaved.guard';
import { AuthGuard } from './guards/auth.guard';
import { ActivatechildGuard } from './guards/activatechild.guard';
import {ShopCartComponent} from "./components/shop-cart/shop-cart.component";
import {SearchComponent} from "./components/search/search.component";
import { AdminAuthGuard } from './guards/admin-auth.guard';
import {CheckoutComponent} from "./components/checkout/checkout.component";

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: 'sign-in', component: SigninComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'navigation', component: NavigationComponent },
  { path: 'shop-cart', component: ShopCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'search', component: MainComponent },
  { path: 'filter', component: MainComponent },
  // { path: 'admin/products/:id', component: ProductEditComponent, canDeactivate: [UnsavedGuard]}
  { path: 'products/details/:id', component: ProductDetailComponent, canActivate : [AuthGuard], canActivateChild: [ActivatechildGuard], children: [
    {path: 'main', component: MainComponent}
  ] },
  {
    path: 'admin/products',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    // canLoad: [AdminAuthGuard],
    // canActivate: [AdminAuthGuard]
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
