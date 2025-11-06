// File: src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // 🏠 صفحه اصلی واقعی (HomePage)
  {
    path: '',
    loadComponent: () =>
      import('./pages/home').then(m => m.HomePage),
    pathMatch: 'full'
  },

  // 📋 لیست فروشگاه‌ها
  {
    path: 'shops',
    loadComponent: () =>
      import('./pages/shops').then(m => m.ShopsPage)
  },

  // 🛍️ ایجاد فروشگاه جدید
  {
    path: 'create-shop',
    loadComponent: () =>
      import('./pages/create-shop').then(m => m.CreateShopPage)
  },

  // 🔍 جزئیات فروشگاه
  {
    path: 'shop/:id',
    loadComponent: () =>
      import('./pages/shop-detail').then(m => m.ShopDetailPage)
  },

  // ✏️ ویرایش فروشگاه
  {
    path: 'edit-shop/:id',
    loadComponent: () =>
      import('./pages/create-shop').then(m => m.CreateShopPage)
  },

  // 👤 حساب کاربری
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/account').then(m => m.AccountPage)
  },

  // 🔑 ورود کاربر
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login').then(m => m.LoginPage)
  },

  // 🧭 اگر مسیر اشتباه وارد شد برگرد به خانه
  {
    path: '**',
    redirectTo: ''
  }
];
