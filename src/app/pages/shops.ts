// src/app/pages/shops.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../services/shop.service';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-shops',
  imports: [CommonModule, FormsModule],
  templateUrl: './shops.html',
  styleUrls: ['./shops.css']
})
export class ShopsPage implements OnInit {
  shops: any[] = [];
  loading = true;
  fallbackImage = 'assets/no-image.png';
  currentUser: string | null = null;

  constructor(private service: ShopService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.auth.getUsername() || localStorage.getItem('username');
    this.loadShops();
  }

  // ✅ دریافت لیست فروشگاه‌ها
  loadShops() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => {
        this.shops = data.map((shop: any) => ({
          ...shop,
          // ساخت مسیر ایمن برای کاور — در حالت لوکال یا سرور
          safeCover: shop.coverImage
            ? `${shop.coverImage.startsWith('http') ? '' : environment.apiUrl + '/uploads/'}${shop.coverImage}`
            : this.fallbackImage,
          // بررسی مالک فروشگاه برای نمایش دکمه‌ها
          isOwner: !!this.currentUser && this.currentUser === shop.owner
        }));
        this.loading = false;
      },
      error: err => {
        console.error('❌ خطا در دریافت اطلاعات:', err);
        this.loading = false;
      }
    });
  }

  goToCreateShop() {
    this.router.navigate(['/create-shop']);
  }

  goToDetail(id: number) {
    this.router.navigate(['/shop', id]);
  }

  // ✅ حذف فروشگاه با کنترل مالکیت
  deleteShop(id: number, e: Event) {
    e.stopPropagation();
    if (!confirm('آیا از حذف این فروشگاه اطمینان دارید؟')) return;

    const username = this.currentUser || '';
    this.service.deleteShop(id, username).subscribe({
      next: () => {
        alert('✅ فروشگاه حذف شد.');
        this.shops = this.shops.filter(s => s.id !== id);
      },
      error: err => {
        if (err.status === 403) alert('❌ شما مجاز به حذف این فروشگاه نیستید.');
        else alert('❌ خطا در حذف فروشگاه.');
      }
    });
  }

  editShop(id: number, e: Event) {
    e.stopPropagation();
    this.router.navigate(['/edit-shop', id]);
  }

  // ✅ مدیریت محصولات فروشگاه
  manageProducts(shopId: number, e: Event) {
    e.stopPropagation();
    this.router.navigate([`/shop/${shopId}/products`]);
  }

  // ✅ هندل کردن خطای تصویر (در صورتی که فایل پیدا نشود)
  handleImageError(shop: any) {
    shop.safeCover = this.fallbackImage;
  }
}
