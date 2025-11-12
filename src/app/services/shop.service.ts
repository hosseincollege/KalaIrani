// File: src/app/services/shop.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private apiUrl = `${environment.apiUrl}/shops`;
  private productsUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  // ✅ دریافت همه فروشگاه‌ها
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ دریافت فروشگاه بر اساس شناسه
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ ایجاد فروشگاه جدید
  createShop(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // ✅ به‌روزرسانی اطلاعات فروشگاه
  updateShop(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // ✅ حذف فروشگاه (ارسال نام کاربر جهت کنترل دسترسی)
  deleteShop(id: number, username: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}?username=${username}`);
  }

  // ✅ دریافت محصولات یک فروشگاه خاص
  getProductsByShop(shopId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.productsUrl}/by-shop/${shopId}`);
  }

  // ✅ حذف یک محصول خاص
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.productsUrl}/${productId}`);
  }

  // ✅ افزودن محصول جدید به یک فروشگاه
  createProduct(shopId: number, productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.productsUrl}/create/${shopId}`, productData);
  }
}
