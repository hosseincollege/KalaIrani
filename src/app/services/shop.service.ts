import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private apiUrl = 'https://localhost:7255/api/shops'; // آدرس بک‌اندت

  constructor(private http: HttpClient) {}

  getAllShops() {
    return this.http.get(this.apiUrl);
  }

  createShop(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
