// File: src/app/pages/shop-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment'; // ✅ اضافه شد

@Component({
  standalone: true,
  selector: 'app-shop-detail',
  imports: [CommonModule],
  templateUrl: './shop-detail.html',
  styleUrls: ['./shop-detail.css']
})
export class ShopDetailPage implements OnInit {
  shop: any = null;
  loading = true;
  coverSrc: string = '';
  galleryItems: string[] = [];
  products: any[] = [];
  isOwner = false;
  fallbackImage = 'assets/no-image.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const currentUser = this.auth.getUsername();
    this.loadShop(id, currentUser);
  }

  // 🔹 بارگذاری جزئیات فروشگاه
  loadShop(id: number, currentUser: string | null) {
    this.loading = true;
    this.shopService.getById(id).subscribe({
      next: (res) => {
        this.shop = res;
        this.loading = false;

        // ✅ ساخت آدرس کامل کاور با استفاده از environment
        this.coverSrc = res.coverImage
          ? `${environment.apiUrl}/uploads/${res.coverImage}`
          : this.fallbackImage;

        // ✅ ساخت آدرس کامل آیتم‌های گالری با استفاده از environment
        this.galleryItems = (res.gallery || []).map(
          (img: string) => `${environment.apiUrl}/uploads/${img}`
        );

        this.isOwner = Boolean(currentUser && currentUser === res.owner);
        this.loadProducts(id);
      },
      error: (err) => {
        console.error('❌ خطا در دریافت جزئیات فروشگاه:', err);
        this.loading = false;
        // در صورت خطای 404 یا هر خطا، به صفحه فروشگاه‌ها برگرد
        // this.router.navigate(['/shops']);
      }
    });
  }

  // 🔹 بارگذاری محصولات (مسیر ProductsUrl در ShopService باید اصلاح شود)
  loadProducts(shopId: number) {
    this.shopService.getProductsByShop(shopId).subscribe({
      next: (data) => {
        this.products = (data || []).map((p: any) => ({
          ...p,
          // ✅ فرض می‌کنیم imagePath فقط نام فایل هست و نیاز به اضافه کردن apiUrl/uploads داره
          imageUrl: p.imagePath ? `${environment.apiUrl}/uploads/${p.imagePath}` : this.fallbackImage
        }));
      },
      error: (err) => console.error('❌ خطا در دریافت محصولات:', err)
    });
  }

  // 🔹 هندل خطا تصاویر
  handleImageError(item: any) {
    item.imageUrl = this.fallbackImage;
  }

  // 🔹 عملیات مدیریتی
  goBack() {
    this.router.navigate(['/shops']);
  }

  editShop(id: number) {
    this.router.navigate(['/edit-shop', id]);
  }

  // 🔹 حذف فروشگاه – فقط توسط صاحب آن
  deleteShop(id: number) {
    if (!confirm('آیا از حذف این فروشگاه اطمینان دارید؟')) return;

    const username = this.auth.getUsername();
    if (!username) {
      alert('ابتدا وارد حساب کاربری شوید.');
      return;
    }

    this.shopService.deleteShop(id, username).subscribe({
      next: () => {
        alert('✅ فروشگاه با موفقیت حذف شد.');
        this.router.navigate(['/shops']);
      },
      error: (err) => {
        if (err.status === 403) alert('❌ شما مالک این فروشگاه نیستید.');
        else alert('❌ خطا در حذف فروشگاه.');
        console.error('❌ Error deleting shop:', err);
      }
    });
  }
}
