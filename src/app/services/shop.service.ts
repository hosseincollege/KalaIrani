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

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createShop(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateShop(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteShop(id: number, username: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}?username=${username}`);
  }

  getProductsByShop(shopId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.productsUrl}/by-shop/${shopId}`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.productsUrl}/${productId}`);
  }

  createProduct(shopId: number, productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.productsUrl}/create/${shopId}`, productData);
  }
}
