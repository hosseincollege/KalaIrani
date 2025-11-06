// src/app/pages/create-shop.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-create-shop',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-shop.html',
  styleUrls: ['./create-shop.css']
})
export class CreateShopPage {
  shop = {
    name: '',
    description: '',
    category: '',
    industrialField: '',
    manufacturerName: '',
    manufacturerType: '',
    licenseNumber: '',
    contractNumber: '',
    branchType: '',
    province: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    establishedYear: '',
    coverImage: null as File | null,
    gallery: [] as File[]
  };

  categories = [
    'الکترونیکی', 'ابزار دقیق', 'صنعتی', 'خودرویی', 'خانگی',
    'عطر و ادکلن', 'شیمیایی', 'پوشاک و چرم', 'ارتباطات و شبکه', 'آی‌تی و کامپیوتر'
  ];
  provinces = ['تهران','اصفهان','فارس','گیلان','خوزستان','آذربایجان شرقی','یزد','کرمانشاه'];

  manufacturerTypes = ['کارخانه مرکزی','کارگاه تولیدی','شرکت توزیع','نمایندگی رسمی','شعبه فروش'];
  branchTypes = ['نمایندگی مستقیم','نمایندگی داخلی','شعبه فرعی','همکار تأمین','توزیع منطقه‌ای'];

  message = '';
  loading = false;
  coverPreview: string | null = null;
  galleryPreviews: string[] = [];

  constructor(private router: Router, private shopService: ShopService, private auth: AuthService) {}

  // 🔹 انتخاب کاور
  onCoverSelected(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.shop.coverImage = file;
      this.coverPreview = URL.createObjectURL(file);
    }
  }

  // 🔹 انتخاب گالری
  onGallerySelected(e: any) {
    const files = Array.from(e.target.files) as File[];
    this.shop.gallery = files;
    this.galleryPreviews = files.map(f => URL.createObjectURL(f));
  }

  // 🔹 دانلود فرم خام JSON
  downloadForm() {
    const blob = new Blob([JSON.stringify(this.shop, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'industrial-shop-template.json';
    link.click();
  }

  // 🔹 بارگذاری فرم JSON
  uploadJson(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      try {
        const data = JSON.parse(evt.target.result);
        this.shop = { ...this.shop, ...data };
        alert('✅ فرم با موفقیت بارگذاری شد');
      } catch {
        alert('❌ خطا در خواندن فایل JSON');
      }
    };
    reader.readAsText(file);
  }

  // 🔹 ثبت فروشگاه
  onSubmit() {
    if (!this.auth.isLoggedIn()) {
      alert('ابتدا وارد حساب کاربری شوید.');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.shop.name.trim() || !this.shop.category.trim() || !this.shop.manufacturerName.trim()) {
      this.message = '⚠️ لطفاً نام فروشگاه، نوع فعالیت و کارخانه مرتبط را وارد کنید.';
      return;
    }

    this.loading = true;
    const formData = new FormData();
    Object.entries(this.shop).forEach(([key, value]) => {
      if (key === 'gallery') return;
      if (value) formData.append(key, value as any);
    });
    this.shop.gallery.forEach(g => formData.append('gallery', g));
    formData.append('owner', localStorage.getItem('username') || 'ناشناس');

    this.shopService.createShop(formData).subscribe({
      next: () => {
        this.message = '✅ فروشگاه تخصصی با موفقیت ثبت شد.';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/shops']), 2000);
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ خطا در ارسال اطلاعات.';
        this.loading = false;
      }
    });
  }

  goBackToList() {
    this.router.navigate(['/shops']);
  }
}
