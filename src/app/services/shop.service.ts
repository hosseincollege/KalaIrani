// File: src/app/services/shop.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopService {
  // 👇 پروتکل صحیح (HTTP نه HTTPS)
  private apiUrl = 'http://localhost:5189/api/shops';

  constructor(private http: HttpClient) {}

  // دریافت همه فروشگاه‌ها
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ایجاد فروشگاه
  createShop(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // دریافت فروشگاه بر اساس شناسه
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // حذف فروشگاه (برای صاحب فروشگاه)
  deleteShop(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ویرایش فروشگاه (در صورت نیاز بعداً استفاده می‌شود)
  updateShop(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
