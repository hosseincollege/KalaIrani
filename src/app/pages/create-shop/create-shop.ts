// File: src/app/pages/create-shop/create-shop.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service';

@Component({
  standalone: true,
  selector: 'app-create-shop',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-shop.html',
  styleUrls: ['./create-shop.css']
})
export class CreateShopPage {
  shopName = '';
  description = '';
  message = '';

  constructor(private router: Router, private shopService: ShopService) {}

  createShop() {
    if (!this.shopName) {
      this.message = 'لطفاً نام فروشگاه را وارد کنید';
      return;
    }

    // داده جدیدی که باید به دیتابیس فرستاده شود
    const newShop = {
      name: this.shopName,
      description: this.description,
      owner: localStorage.getItem('username')
    };

    // ارسال به بک‌اند با HTTP
    this.shopService.createShop(newShop).subscribe({
      next: (res) => {
        this.message = '✅ فروشگاه در دیتابیس ذخیره شد';
        setTimeout(() => this.router.navigate(['/shops']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ خطا در ارتباط با سرور';
      }
    });
  }
}
