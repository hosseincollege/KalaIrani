// File: src/app/pages/shop-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { AuthService } from '../auth.service';

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
  coverSrc = '';
  galleryItems: string[] = [];
  isOwner: boolean = false;

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

  loadShop(id: number, currentUser: string | null) {
    this.shopService.getById(id).subscribe({
      next: (res) => {
        this.shop = res;
        this.loading = false;

        // ✅ مسیر کامل کاور
        this.coverSrc = res.coverImagePath
          ? `http://localhost:5189${res.coverImagePath}`
          : 'assets/img/no-cover.png';

        // ✅ گالری پایدار
        this.galleryItems = (res.galleryPaths || []).map(
          (g: string) => `http://localhost:5189${g}`
        );

        // ✅ تشخیص مالکیت ولی بدون نمایش نام کاربری
        this.isOwner = Boolean(currentUser && currentUser === res.owner);
      },
      error: (err) => {
        console.error('❌ خطا در دریافت جزئیات فروشگاه:', err);
        this.loading = false;
      }
    });
  }

  goToProducts(shopId: number) {
    this.router.navigate(['/shops', shopId, 'products']);
  }

  goBack() {
    this.router.navigate(['/shops']);
  }

  editShop(id: number) {
    this.router.navigate(['/edit-shop', id]);
  }

  deleteShop(id: number) {
    if (!confirm('آیا از حذف این فروشگاه اطمینان دارید؟')) return;
    this.shopService.deleteShop(id).subscribe({
      next: () => {
        alert('✅ فروشگاه حذف شد.');
        this.router.navigate(['/shops']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ خطا در حذف فروشگاه.');
      }
    });
  }
}
