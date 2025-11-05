// File: src/app/pages/shops/shops.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop.service';

@Component({
  standalone: true,
  selector: 'app-shops',
  imports: [CommonModule, RouterLink],
  templateUrl: './shops.html',
  styleUrls: ['./shops.css']
})
export class ShopsPage implements OnInit {
  shops: any[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.shopService.getAllShops().subscribe({
      next: (data: any) => {
        this.shops = data;
      },
      error: (err) => {
        console.error('خطا در دریافت اطلاعات از سرور', err);
      }
    });
  }
}
