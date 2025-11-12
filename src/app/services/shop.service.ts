// File: src/app/services/shop.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private apiUrl = `${environment.apiUrl}/shops`;
  private productsUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

=======

@Injectable({ providedIn: 'root' })
export class ShopService {
  private apiUrl = 'http://localhost:5189/api/shops';
  private productsUrl = 'http://localhost:5189/api/products';

  constructor(private http: HttpClient) {}

  // ✅ دریافت همه فروشگاه‌ها
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

<<<<<<< HEAD
=======
  // ✅ دریافت فروشگاه بر اساس شناسه
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

<<<<<<< HEAD
=======
  // ✅ ایجاد فروشگاه جدید
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  createShop(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

<<<<<<< HEAD
=======
  // ✅ به‌روزرسانی اطلاعات فروشگاه
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  updateShop(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

<<<<<<< HEAD
=======
  // ✅ حذف فروشگاه (ارسال owner جهت کنترل دسترسی)
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  deleteShop(id: number, username: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}?username=${username}`);
  }

<<<<<<< HEAD
=======
  // ✅ دریافت محصولات یک فروشگاه خاص
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  getProductsByShop(shopId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.productsUrl}/by-shop/${shopId}`);
  }

<<<<<<< HEAD
=======
  // ✅ حذف محصول
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.productsUrl}/${productId}`);
  }

<<<<<<< HEAD
=======
  // ✅ افزودن محصول به فروشگاه
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  createProduct(shopId: number, productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.productsUrl}/create/${shopId}`, productData);
  }
}
