// File: src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then(m => m.HomePage),
    pathMatch: 'full'
  },
  {
    path: 'shops',
    loadComponent: () => import('./pages/shops').then(m => m.ShopsPage)
  },
  {
    path: 'create-shop',
    loadComponent: () => import('./pages/create-shop').then(m => m.CreateShopPage)
  },
  {
    path: 'shop/:id',
    loadComponent: () => import('./pages/shop-detail').then(m => m.ShopDetailPage)
  },
  {
    path: 'edit-shop/:id',
    loadComponent: () => import('./pages/create-shop').then(m => m.CreateShopPage)
  },
<<<<<<< HEAD
=======
  // ✅ مسیر جدید برای مدیریت محصولات فروشگاه
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  {
    path: 'shop/:id/products',
    loadComponent: () => import('./pages/products').then(m => m.ProductsPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account').then(m => m.AccountPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login').then(m => m.LoginPage)
  },
  {
<<<<<<< HEAD
    path: 'register',
    loadComponent: () => import('./pages/register').then(m => m.RegisterPage)
  },
  {
=======
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
    path: '**',
    redirectTo: ''
  }
];
