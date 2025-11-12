// src/app/pages/shop-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

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

        this.coverSrc = res.coverImage
          ? `${res.coverImage.startsWith('http') ? '' : environment.apiUrl + '/uploads/'}${res.coverImage}`
          : this.fallbackImage;

        this.galleryItems = (res.gallery || []).map((g: string) =>
          `${g.startsWith('http') ? '' : environment.apiUrl + '/uploads/'}${g}`
        );


        this.isOwner = Boolean(currentUser && currentUser === res.owner);
        this.loadProducts(id);
      },
      error: (err) => {
        console.error('❌ خطا در دریافت جزئیات فروشگاه:', err);
        this.loading = false;
      }
    });
  }

  // 🔹 بارگذاری محصولات
  loadProducts(shopId: number) {
    this.shopService.getProductsByShop(shopId).subscribe({
      next: (data) => {
        this.products = (data || []).map((p: any) => ({
          ...p,
          imageUrl: p.imagePath ? `http://localhost:5189${p.imagePath}` : this.fallbackImage
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

    const username = this.auth.getUsername(); // <<< نام کاربر فعلی
    if (!username) {
      alert('ابتدا وارد حساب کاربری شوید.');
      return;
    }

    this.shopService.deleteShop(id, username).subscribe({
      next: () => {
        alert('✅ فروشگاه حذف شد.');
        this.router.navigate(['/shops']);
      },
      error: (err) => {
        if (err.status === 403)
          alert('❌ شما مجاز به حذف این فروشگاه نیستید.');
        else
          alert('❌ خطا در حذف فروشگاه.');
      }
    });
  }

  manageProducts(shopId: number) {
    this.router.navigate(['/shops', shopId, 'products']);
  }
}
