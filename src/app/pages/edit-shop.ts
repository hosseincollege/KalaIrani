// File: src/app/pages/edit-shop.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-edit-shop',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-shop.html',
  styleUrls: ['./edit-shop.css']
})
export class EditShopPage implements OnInit {
  shopId: number = 0;
  shop: any = {};
  message = '';
  loading = true;

  coverPreview: string | null = null;
  galleryPreviews: string[] = [];

  categories = [
    'الکترونیکی', 'ابزار دقیق', 'صنعتی', 'خودرویی', 'خانگی',
    'عطر و ادکلن', 'شیمیایی', 'پوشاک و چرم', 'ارتباطات و شبکه', 'آی‌تی و کامپیوتر'
  ];
  provinces = ['تهران', 'اصفهان', 'فارس', 'گیلان', 'خوزستان', 'آذربایجان شرقی', 'یزد', 'کرمانشاه'];
  manufacturerTypes = ['کارخانه مرکزی', 'کارگاه تولیدی', 'شرکت توزیع', 'نمایندگی رسمی', 'شعبه فروش'];
  branchTypes = ['نمایندگی مستقیم', 'نمایندگی داخلی', 'شعبه فرعی', 'همکار تأمین', 'توزیع منطقه‌ای'];

  constructor(private route: ActivatedRoute, private router: Router, private shopService: ShopService, private auth: AuthService) {}

  ngOnInit() {
    this.shopId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadShop();
  }

  loadShop() {
    this.shopService.getById(this.shopId).subscribe({
      next: (res) => {
        this.shop = { ...res };
        this.coverPreview = this.shop.coverImagePath ? `http://localhost:5189${this.shop.coverImagePath}` : null;
        this.galleryPreviews = (res.galleryPaths || []).map((g: string) => `http://localhost:5189${g}`);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطا در بارگذاری فروشگاه:', err);
        this.loading = false;
      }
    });
  }

  // تغییر کاور
  onCoverSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.shop.coverImage = file;
      this.coverPreview = URL.createObjectURL(file);
    }
  }

  // تغییر گالری
  onGallerySelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.shop.gallery = files;
    this.galleryPreviews = files.map((f) => URL.createObjectURL(f));
  }

  saveChanges() {
    if (!this.shop.name || !this.shop.category) {
      this.message = '⚠️ لطفاً نام و دسته‌بندی را وارد کنید.';
      return;
    }
    this.loading = true;

    const formData = new FormData();
    Object.entries(this.shop).forEach(([key, value]) => {
      if (key === 'gallery') return;
      if (value) formData.append(key, value as any);
    });
    (this.shop.gallery || []).forEach((g: File) => formData.append('gallery', g));

    this.shopService.updateShop(this.shopId, formData).subscribe({
      next: () => {
        this.message = '✅ تغییرات با موفقیت ثبت شد.';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/shop', this.shopId]), 2000);
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ خطا در ثبت تغییرات.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/shops']);
  }
}
