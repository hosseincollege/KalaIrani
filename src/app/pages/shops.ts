// File: src/app/pages/shops.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ افزودن برای ngModel
import { ShopService } from '../services/shop.service';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-shops',
  imports: [CommonModule, FormsModule],
  templateUrl: './shops.html',
  styleUrls: ['./shops.css']
})
export class ShopsPage implements OnInit {
  shops: any[] = [];
  filteredShops: any[] = [];
  loading = true;
  currentUser: string | null = null;

  // 🔹 فیلترها و داده‌ها
  categoryFilter = '';
  provinceFilter = '';
  categories = ['الکترونیکی', 'صنعتی', 'فلزی', 'خوراکی', 'پوشاک'];
  provinces = ['تهران', 'اصفهان', 'فارس', 'گیلان', 'خوزستان'];

  fallbackImage = 'assets/no-image.png';

  constructor(
    private shopService: ShopService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getUsername();
    this.loadShops();
  }

  loadShops() {
    this.loading = true;
    this.shopService.getAll().subscribe({
      next: (data) => {
        this.shops = (data || []).map(shop => ({
          ...shop,
          safeCover: shop.coverImagePath
            ? `http://localhost:5189${shop.coverImagePath}`
            : this.fallbackImage
        }));
        this.filteredShops = this.shops;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطا در دریافت فروشگاه‌ها:', err);
        this.loading = false;
      }
    });
  }

  // ✅ اعمال فیلترها
  applyFilters() {
    this.filteredShops = this.shops.filter(shop => {
      const matchCategory = !this.categoryFilter || shop.category === this.categoryFilter;
      const matchProvince = !this.provinceFilter || shop.city === this.provinceFilter;
      return matchCategory && matchProvince;
    });
  }

  // ✅ هدایت‌ها
  goToDetail(id: number) {
    this.router.navigate(['/shop', id]);
  }

  goToCreateShop() {
    this.router.navigate(['/create-shop']);
  }

  goBackToList() {
    this.router.navigate(['/shops']);
  }

  editShop(shopId: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/edit-shop', shopId]);
  }

  deleteShop(shopId: number, event: Event) {
    event.stopPropagation();
    if (!confirm('آیا از حذف این فروشگاه مطمئن هستید؟')) return;
    this.shopService.deleteShop(shopId).subscribe({
      next: () => {
        alert('✅ فروشگاه حذف شد.');
        this.shops = this.shops.filter(s => s.id !== shopId);
        this.filteredShops = this.shops;
      },
      error: (err) => {
        console.error('❌ خطا در حذف فروشگاه:', err);
        alert('خطا در حذف فروشگاه');
      }
    });
  }

  handleImageError(shop: any) {
    if (shop.safeCover !== this.fallbackImage) {
      shop.safeCover = this.fallbackImage;
    }
  }

  canManage(owner: string): boolean {
    return Boolean(this.currentUser && this.currentUser === owner);
  }
}
