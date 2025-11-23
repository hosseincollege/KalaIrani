// File: src/app/pages/account.ts ✅ نسخه نهایی اصلاح‌شده حسین
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ShopService } from '../services/shop.service';

@Component({
  standalone: true,
  selector: 'app-account',
  imports: [CommonModule, RouterLink],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountPage implements OnInit {
  user: any;
  isLoggedIn = false;
  myShops: any[] = [];
  loading = false;
  fallbackImage = 'assets/no-image.png';

  constructor(
    private auth: AuthService,
    private router: Router,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    const username = localStorage.getItem('username');
    this.user = username;

    if (this.isLoggedIn) {
      this.loading = true;
      this.shopService.getAll().subscribe({
        next: (shops: any[]) => {
          // فقط فروشگاه‌های کاربر فعلی
          this.myShops = shops
            .filter(s => s.owner === username)
            .map(s => ({
              ...s,
              // از URL کامل بک‌اند استفاده کن
              safeCover: s.coverImagePath && s.coverImagePath.trim() !== ''
                ? s.coverImagePath
                : this.fallbackImage
            }));
          this.loading = false;
        },
        error: err => {
          console.error('❌ خطا در دریافت فروشگاه‌ها:', err);
          this.loading = false;
        }
      });
    }
  }

  goToCreateShop() {
    this.router.navigate(['/create-shop']);
  }

  manageProducts(shopId: number) {
    this.router.navigate([`/shops/${shopId}/products`]);
  }

  goToShopDetail(shopId: number) {
    this.router.navigate([`/shop/${shopId}`]);
  }

  handleImageError(shop: any) {
    if (shop.safeCover !== this.fallbackImage) {
      shop.safeCover = this.fallbackImage;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
