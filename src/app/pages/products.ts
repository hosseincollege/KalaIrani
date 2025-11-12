// File: src/app/pages/products.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsPage implements OnInit {
  shopId: number = 0;
  shopName = '';
  products: any[] = [];

  productName = '';
  productPrice: number | null = null;
  productDescription = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    // گرفتن آرگومان shopId از URL
    this.shopId = Number(this.route.snapshot.paramMap.get('shopId'));

    // بارگذاری محصولات مربوط به فروشگاه
    const allProducts = JSON.parse(localStorage.getItem('products') || '{}');
    this.products = allProducts[this.shopId] || [];

    // اسم فروشگاه (اختیاری)
    const allNames = JSON.parse(localStorage.getItem('shop_names') || '{}');
    this.shopName = allNames[this.shopId] || 'فروشگاه من';
  }

  addProduct() {
    if (!this.productName || !this.productPrice) {
      this.message = '⚠️ لطفاً نام و قیمت محصول را وارد کنید.';
      return;
    }

    const newProduct = {
      name: this.productName,
      price: this.productPrice,
      description: this.productDescription
    };

    const allProducts = JSON.parse(localStorage.getItem('products') || '{}');
    if (!Array.isArray(allProducts[this.shopId])) allProducts[this.shopId] = [];
    allProducts[this.shopId].push(newProduct);

    localStorage.setItem('products', JSON.stringify(allProducts));
    this.products = allProducts[this.shopId];
    this.productName = '';
    this.productPrice = null;
    this.productDescription = '';
    this.message = '✅ محصول با موفقیت اضافه شد.';
  }

  deleteProduct(prod: any) {
    if (!confirm('آیا از حذف این محصول مطمئن هستید؟')) return;

    const allProducts = JSON.parse(localStorage.getItem('products') || '{}');
    allProducts[this.shopId] = allProducts[this.shopId].filter(
      (p: any) => p.name !== prod.name
    );
    localStorage.setItem('products', JSON.stringify(allProducts));
    this.products = allProducts[this.shopId];
    this.message = '🗑️ محصول حذف شد.';
  }

  clearAll() {
    if (confirm('تمامی محصولات این فروشگاه حذف شوند؟')) {
      const allProducts = JSON.parse(localStorage.getItem('products') || '{}');
      allProducts[this.shopId] = [];
      localStorage.setItem('products', JSON.stringify(allProducts));
      this.products = [];
      this.message = '❌ همه محصولات حذف شدند.';
    }
  }

  backToAccount() {
    this.router.navigate(['/account']);
  }
}
