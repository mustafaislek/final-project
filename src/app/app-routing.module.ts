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

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: 'sign-in', component: SigninComponent, canDeactivate: [UnsavedGuard]},
  { path: 'sign-up', component: SignupComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent, canActivate : [AuthGuard], canActivateChild: [ActivatechildGuard], children: [
    {path: 'main', component: MainComponent}
  ] },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
