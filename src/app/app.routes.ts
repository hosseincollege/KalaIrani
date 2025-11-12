// File: src/app/app.routes.ts
import { Routes } from '@angular/router';
// ⚠️ توجه: نیازی به ایمپورت‌های بالا نیست زیرا از loadComponent استفاده می‌شود.

export const routes: Routes = [
  {
    path: '',
    // ✅ مسیردهی به فایل 'home.ts' در پوشه 'pages'
    loadComponent: () => import('./pages/home').then(m => m.HomePage),
    pathMatch: 'full'
  },
  {
    path: 'shops',
    // ✅ مسیردهی به فایل 'shops.ts' در پوشه 'pages'
    loadComponent: () => import('./pages/shops').then(m => m.ShopsPage)
  },
  {
    path: 'create-shop',
    // ✅ مسیردهی به فایل 'create-shop.ts' در پوشه 'pages'
    loadComponent: () => import('./pages/create-shop').then(m => m.CreateShopPage)
  },
  {
    path: 'shop/:id',
    // ✅ مسیردهی به فایل 'shop-detail.ts' در پوشه 'pages'
    loadComponent: () => import('./pages/shop-detail').then(m => m.ShopDetailPage)
  },
  {
    path: 'edit-shop/:id',
    // ✅ مسیردهی به فایل 'create-shop.ts' (برای ویرایش) در پوشه 'pages'
    loadComponent: () => import('./pages/create-shop').then(m => m.CreateShopPage)
  },
  {
    path: 'shop/:id/products',
    // ✅ مسیردهی به فایل 'products.ts' در پوشه 'pages'
    loadComponent: () => import('./pages/products').then(m => m.ProductsPage)
  },
  {
    path: 'account',
    // ✅ مسیردهی به فایل 'account.ts' در پوشه 'pages'
    loadComponent: () => import('./pages/account').then(m => m.AccountPage)
  },
  {
    path: 'login',
    // ✅ مسیردهی به فایل 'login.ts' در پوشه 'pages'
    loadComponent: () => import('./pages/login').then(m => m.LoginPage)
  },
  {
    path: 'register',
    // ✅ مسیردهی به فایل 'register.ts' در پوشه 'pages'
    loadComponent: () => import('./pages/register').then(m => m.RegisterPage)
  },
  {
    // مسیر Catch-all
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
