import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ShopsPage } from './pages/shops/shops';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { AccountPage } from './pages/account/account';
import { CreateShopPage } from './pages/create-shop/create-shop'; // ✅ مسیر جدید
import { ProductsPage } from './pages/products/products';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'shops', component: ShopsPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'account', component: AccountPage },
  { path: 'create-shop', component: CreateShopPage }, // ✅ اضافه شد
  { path: 'shops/:id/products', component: ProductsPage },
];
