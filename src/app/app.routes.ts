import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ShopDetailsComponent } from './pages/shops/shop-details/shop-details.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shops', component: ShopsComponent },
  { path: 'shops/:id', component: ShopDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: 'login' }
];
